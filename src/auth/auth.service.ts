import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/signIn.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ user: Record<string, string>; token: string }> {
    const user = await this.usersService.findOneByEmail(signInDto.email);

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

      if(partsToken.length !== 2)
        throw new UnauthorizedException();

      const [ scheme, token ] = partsToken;    

      if(!/^Bearer$/i.test(scheme))
        throw new UnauthorizedException();

      const res : User = await this.jwtService.verifyAsync(token, {
        secret: 'asdf1234', //TODO adicionar em variável de ambiente
      });

      const payload = { id: res.id, name: res.name, email: res.email };

      return {
        user : {  name: payload.name, email: payload.email },
        token: token,
      };

    } catch (error) {
      throw new UnauthorizedException();
    }


  }
}
