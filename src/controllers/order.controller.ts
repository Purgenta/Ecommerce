import { Controller } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Client } from 'src/decorators/user.decorator';
import { User } from '@prisma/client';
import { OrderService } from 'src/services/order.service';
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post('add')
  @UseGuards(AuthGuard)
  async addOrder(@Client() user: User) {
    return await this.orderService.addOrder(user);
  }
}
