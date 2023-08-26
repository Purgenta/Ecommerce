import {
  Controller,
  Get,
  UseGuards,
  Body,
  Post,
  Delete,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Client } from 'src/decorators/user.decorator';
import { CartService } from 'src/services/cart.service';
import { User } from '@prisma/client';
import { AddItemDto } from 'src/data/cart/addItem.dto';
@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}
  @Get('cartdata')
  async getUserCart(@Client() user: User) {
    return await this.cartService.getUserCart(user);
  }
  @Post('setitem')
  async setItem(@Body() item: AddItemDto, @Client() user: User) {
    try {
      return await this.cartService.setItem(item, user);
    } catch (error) {
      throw new BadRequestException('An error has occured');
    }
  }
  @Delete('removeitem/:id')
  async removeItem(@Param('id') id: number, @Client() user: User) {
    if (isNaN(+id)) throw new BadRequestException('Not a valid article id');
    return await this.cartService.removeItem(+id, user);
  }
}
