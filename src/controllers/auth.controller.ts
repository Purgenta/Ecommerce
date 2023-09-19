import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from 'src/data/auth/login.dto';
import { RegisterDto } from 'src/data/auth/register.dto';
import { Response } from 'express';
import { Res } from '@nestjs/common/decorators';
import { BadRequestException, HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthService } from 'src/services/auth.service';
import { Public } from 'src/decorators/public.decorator';
import { CartService } from 'src/services/cart.service';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cartService: CartService,
  ) {
    this.authService = authService;
  }
  @Public()
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const { refreshToken, token, user } =
        await this.authService.login(loginDto);
      const cart = await this.cartService.getUserCart(user);
      response.cookie('refreshToken', refreshToken);
      return {
        token,
        role: user.role,
        email: user.email,
        cart,
        wishList: user.wishList,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }
  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      await this.authService.register(registerDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
