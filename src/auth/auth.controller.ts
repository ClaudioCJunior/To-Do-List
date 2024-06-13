import { ConflictException, Controller, Headers} from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { AuthService } from './auth.service';
import { Body, HttpCode, HttpStatus, Post, Head} from '@nestjs/common';
import { Public } from './decorators/auth.decorator';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    if(await this.usersService.findOneByEmail(registerDto.email)){
      throw new ConflictException('Email already exists');
    }

    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify-token')
  verifyToken(@Headers('authorization') authHeader: string) {
    return this.authService.verifyToken(authHeader);
  }
}
