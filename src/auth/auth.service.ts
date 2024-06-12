import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/signIn.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ user: Record<string, string>; token: string }> {
    const user = await this.usersService.findOneByEmail(signInDto.email);

    if(!user){
      throw new NotFoundException("user not found");
    }

    if (!(await bcrypt.compare(signInDto.password, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, name: user.name, email: user.email };
    return {
      user : {  name: user.name, email: user.email },
      token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerDto: RegisterDto): Promise<Record<string, string>> {
    const user = await this.usersService.create(registerDto);

    return {
      name: user.name,
      email: user.email,
    };
  }

  async verifyToken(authHeader: string): Promise<{ user: Record<string, string>; token: string }> {
    try {
      if(!authHeader)
        throw new UnauthorizedException();

      const partsToken = authHeader.split(' ');

      if(partsToken.length > 2)
        throw new UnauthorizedException();

      let token = authHeader;

      if(partsToken.length == 2) {
        let [ scheme, tokenExtract ] = partsToken;    

        if(!/^Bearer$/i.test(scheme))
          throw new UnauthorizedException();

        token = tokenExtract;
      }

      const res : User = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'), //TODO adicionar em variável de ambiente
      });

      const payload = { id: res.id, name: res.name, email: res.email };

      return {
        user : { id: String(payload.id), name: payload.name, email: payload.email },
        token: token,
      };

    } catch (error) {
      throw new UnauthorizedException();
    }


  }
}
