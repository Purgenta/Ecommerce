import { Module } from '@nestjs/common';
import { OrderController } from 'src/controllers/order.controller';
import { OrderService } from 'src/services/order.service';
import { PrismaModule } from './prisma.module';
import { AuthGuard } from 'src/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from 'src/guards/role.guard';
@Module({
  controllers: [OrderController],
  exports: [OrderService],
  imports: [PrismaModule],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    OrderService,
    { provide: APP_GUARD, useClass: RoleGuard },
  ],
})
export class OrderModule {}
