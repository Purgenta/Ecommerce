import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from 'src/data/auth/login.dto';
import { RegisterDto } from 'src/data/auth/register.dto';
import { AuthService } from 'src/services/auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
    this.authService = authService;
  }
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    this.authService.login(loginDto);
  }
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    this.authService.register(registerDto);
  }
}
