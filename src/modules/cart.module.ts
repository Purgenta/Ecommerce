import { Module } from '@nestjs/common';
import { CartController } from 'src/controllers/cart.controller';
import { CartService } from 'src/services/cart.service';
import { PrismaModule } from './prisma.module';
import { RoleGuard } from 'src/guards/role.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';
import { ArticleModule } from './article.module';
@Module({
  imports: [PrismaModule, ArticleModule],
  controllers: [CartController],
  providers: [
    CartService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  exports: [CartService],
})
export class CartModule {}
