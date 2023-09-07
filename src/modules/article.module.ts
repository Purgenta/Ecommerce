import { Module } from '@nestjs/common';
import { ArticleController } from 'src/controllers/article.controller';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { APP_GUARD } from '@nestjs/core';
import { ArticleService } from 'src/services/article.service';
import { PrismaModule } from './prisma.module';
import { CategoryModule } from './category.module';
import { ProducerModule } from './producer.module';
@Module({
  imports: [PrismaModule, CategoryModule, ProducerModule],
  providers: [
    ArticleService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  exports: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
