import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { ArticleService } from './article.service';
@Injectable()
export class WishListService {
  constructor(
    private prismaService: PrismaService,
    private articleService: ArticleService,
  ) {}
  async getWishList(user: User) {
    return await this.prismaService.wishList.findMany({ where: { user } });
  }
  async findWishListItemByUser(user: User, articleId: number) {
    return await this.prismaService.wishList.findFirst({
      where: { articleId, user },
    });
  }
  async addItem(user: User, articleId: number) {
    const item = await this.articleService.findItemById(articleId);
    const wishListItem = await this.findWishListItemByUser(user, articleId);
    if (!wishListItem)
      return await this.prismaService.wishList.create({
        data: { articleId, userId: user.id },
      });
    return item;
  }
  async removeItem(user: User, articleId: number) {
    return await this.prismaService.wishList.deleteMany({
      where: { articleId, userId: user.id },
    });
  }
}
