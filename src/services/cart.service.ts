import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { AddItemDto } from 'src/data/cart/addItem.dto';
import { Cart } from '@prisma/client';
import { ArticleService } from './article.service';
import { ArticleNotFoundException } from 'src/exceptions/article/articleNotFound.exception';
@Injectable()
export class CartService {
  constructor(
    private prismaService: PrismaService,
    private articleService: ArticleService,
  ) {}
  async addItem(addItem: AddItemDto, user: User) {
    const cartItem = await this.prismaService.cartItem.findFirst({
      where: {
        articleId: addItem.articleId,
        cart: { user, status: 'ONGOING' },
      },
    });
    if (cartItem)
      return await this.prismaService.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity: cartItem.quantity + addItem.quantity,
        },
      });
    const article = await this.articleService.findItemById(addItem.articleId);
    const userCart = await this.getUserCart(user);
    return await this.prismaService.cartItem.create({
      data: {
        articleId: article.id,
        cartId: userCart.id,
        quantity: addItem.quantity,
      },
    });
  }
  async getUserCart(user: User) {
    const cart = await this.prismaService.cart.findFirst({
      where: { status: 'ONGOING', userId: user.id },
      include: {
        cartItems: {
          include: {
            article: {
              include: {
                price: true,
                discount: true,
                photos: true,
                producer: true,
                category: true,
              },
            },
          },
        },
      },
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
    const cartItem = await this.prismaService.cartItem.findFirst({
      where: { cartId: cart.id, articleId: item.articleId },
    });
    if (cartItem)
      return await this.prismaService.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: item.quantity },
      });
    return await this.prismaService.cartItem.create({
      data: {
        quantity: item.quantity,
        articleId: article.id,
        cartId: cart.id,
      },
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
  async issueCartForOrder(cart: Cart) {
    return await this.prismaService.cart.update({
      where: { id: cart.id },
      data: { status: 'PROCESSING' },
    });
  }
}
