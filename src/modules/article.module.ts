import { Module } from '@nestjs/common';
import { ArticleController } from 'src/controllers/article.controller';
import { ArticleService } from 'src/services/article.service';
import { PrismaModule } from './prisma.module';
@Module({
  imports: [PrismaModule],
  providers: [ArticleService],
  exports: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
