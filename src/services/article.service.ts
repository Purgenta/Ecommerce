import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
@Injectable()
export class ArticleService {
  constructor(private prismaService: PrismaService) {}
  async findItemById(id: number) {
    return await this.prismaService.article.findFirst({ where: { id } });
  }
}
