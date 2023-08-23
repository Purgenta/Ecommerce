import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Client } from 'src/decorators/user.decorator';
import { CartService } from 'src/services/cart.service';
import { User } from '@prisma/client';
import { Roles } from 'src/decorators/role.decorator';
@UseGuards(AuthGuard)
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}
  @Roles('ADMIN')
  @Get('cartData')
  async getUserCart(@Client() user: User) {
    return await this.cartService.getUserCart(user);
  }
}
