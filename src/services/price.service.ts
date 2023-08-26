import { Injectable } from '@nestjs/common';
import { ArticleService } from './article.service';
import { PrismaService } from './prisma.service';
import { ArticleNotFoundException } from 'src/exceptions/article/articleNotFound.exception';

@Injectable()
export class PriceService {
  constructor(
    private articleService: ArticleService,
    private prismaService: PrismaService,
  ) {}
  async addPrice(articleId: number, price: number) {
    const article = await this.articleService.findItemById(articleId);
    if (!article) throw new ArticleNotFoundException();
    return await this.prismaService.price.create({
      data: { value: price, addedAt: new Date(), articleId },
    });
  }
  async deletePrice(id: number) {
    return await this.prismaService.price.delete({ where: { id } });
  }
}
