import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { AddItemDto } from 'src/data/cart/addItem.dto';
import { ArticleService } from './article.service';
import { ArticleNotFoundException } from 'src/exceptions/article/articleNotFound.exception';
@Injectable()
export class CartService {
  constructor(
    private prismaService: PrismaService,
    private articleService: ArticleService,
  ) {}
  async getUserCart(user: User) {
    const cart = await this.prismaService.cart.findFirst({
      where: { status: 'ONGOING', userId: user.id },
      include: { cartItems: true },
    });
    if (cart) return cart;
    return await this.prismaService.cart.create({
      data: { status: 'ONGOING', userId: user.id },
      include: { cartItems: true },
    });
  }
  async setItem(item: AddItemDto, user: User) {
    const article = await this.articleService.findItemById(item.articleId);
    if (!article) throw new ArticleNotFoundException();
    const cart = await this.getUserCart(user);
    const cartItem = cart.cartItems.find((item) => item.articleId === item.id);
    if (!cartItem) {
      return await this.prismaService.cartItem.create({
        data: {
          quantity: item.quantity,
          articleId: article.id,
          cartId: cart.id,
        },
      });
    }
    return await this.prismaService.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity: cartItem.quantity + item.quantity },
    });
  }
  async removeItem(item: number, user: User) {
    return await this.prismaService.cartItem.deleteMany({
      where: {
        articleId: {
          equals: item,
        },
        cart: { status: { equals: 'ONGOING' }, userId: user.id },
      },
    });
  }
}
