import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ArticleDto } from 'src/data/article/article.dto';
import { CategoryService } from './category.service';
import { CategoryFeatureService } from './categoryFeature.service';
import { ProducerService } from './producer.service';
import { ArticleFilterDto } from 'src/data/article/article.filter.dto';
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
  async filterArticles(article: ArticleFilterDto) {
    const values = article.features
      ? article.features.map((val) => val.values).flat()
      : undefined;
    const articleCount = await this.prismaService.article.count({
      where: {
        category: {
          name: article.categoryName,
        },
        isSelling: true,
        name: article.name,
        articleFeatures: !article.features
          ? undefined
          : {
              some: {
                featureId: {
                  in: article.features.map((feature) => feature.id),
                },
                value: { in: values },
              },
            },
      },
    });
    const articles = await this.prismaService.article.findMany({
      where: {
        category: {
          name: article.categoryName,
        },
        isSelling: true,
        name: article.name,
        articleFeatures: !article.features
          ? undefined
          : {
              some: {
                featureId: {
                  in: article.features.map((feature) => feature.id),
                },
                value: { in: values },
              },
            },
      },
      distinct: 'id',
      skip: article.page * article.size,
      take: article.size,
      include: {
        photos: true,
        producer: true,
        price: true,
        articleFeatures: true,
        flair: true,
        category: { select: { discount: true } },
      },
    });
    return { articles: articles, articleCount };
  }
}
