import { Module } from '@nestjs/common';
import { WishListController } from 'src/controllers/wish.list.controler';
import { PrismaModule } from './prisma.module';
import { WishListService } from 'src/services/wish.list.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { ArticleModule } from './article.module';
@Module({
  controllers: [WishListController],
  imports: [PrismaModule, ArticleModule],
  exports: [WishListService],
  providers: [
    WishListService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class WishListModule {}
