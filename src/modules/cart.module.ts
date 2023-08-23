import { Module } from '@nestjs/common';
import { CartController } from 'src/controllers/cart.controller';
import { CartService } from 'src/services/cart.service';
import { PrismaModule } from './prisma.module';
import { RoleGuard } from 'src/guards/role.guard';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [PrismaModule],
  controllers: [CartController],
  providers: [
    CartService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  exports: [CartService],
})
export class CartModule {}
