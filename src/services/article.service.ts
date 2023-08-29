import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ArticleDto } from 'src/data/article/article.dto';
import { CategoryService } from './category.service';
import { CategoryFeatureService } from './categoryFeature.service';
import { ProducerService } from './producer.service';
@Injectable()
export class ArticleService {
  constructor(
    private prismaService: PrismaService,
    private categoryService: CategoryService,
    private categoryFeatureService: CategoryFeatureService,
    private producerService: ProducerService,
  ) {}
  async findItemById(id: number) {
    return await this.prismaService.article.findFirst({
      where: { id },
      select: {
        articleFeatures: true,
        category: true,
        model: true,
        photos: true,
        producer: true,
        quantity: true,
        name: true,
        price: true,
        id: true,
      },
    });
  }
  async addArticle(article: ArticleDto) {
    const category = await this.categoryService.findById(article.categoryId);
    await this.producerService.findById(article.producerId);
    const { features } = article;
    const parentFeatures =
      await this.categoryFeatureService.getCategoryFeatures(category.id);
    features.forEach(({ featureId }) => {
      if (!parentFeatures.has(featureId))
        throw new Error('Feature you specified, doesnt exist');
    });
    const { model, name, price, producerId, categoryId } = article;
    return await this.prismaService.article.create({
      data: {
        isSelling: true,
        name,
        categoryId,
        producerId,
        quantity: 0,
        price: { create: { value: price, addedAt: new Date() } },
        articleFeatures: { createMany: { data: article.features } },
        model,
      },
    });
  }
  async deleteItem(id: number) {
    return await this.prismaService.article.update({
      where: { id },
      data: { isSelling: false },
    });
  }
}
