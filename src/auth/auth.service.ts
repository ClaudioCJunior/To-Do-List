import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/signIn.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ user: Record<string, string>; access_token: string }> {
    const user = await this.usersService.findOneByEmail(signInDto.email);

    if(!await bcrypt.compare(signInDto.password, user.password)){
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id, username: user.name };
    return {
      user: { name: user.name, email: user.email },
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(
    registerDto: RegisterDto,
  ): Promise<Record<string, string>> {
    const user = await this.usersService.create(registerDto);

    return {
      name: user.name,
      email: user.email,
    }

  }
}
