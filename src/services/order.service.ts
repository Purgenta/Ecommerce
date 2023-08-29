import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '@prisma/client';
import { CartService } from './cart.service';
@Injectable()
export class OrderService {
  constructor(
    private prismaService: PrismaService,
    private cartService: CartService,
  ) {}
  async addOrder(user: User) {
    const cart = await this.cartService.getUserCart(user);
    if (!cart.cartItems.length)
      throw new Error("Cart doesn't contain any items");
  }
}
