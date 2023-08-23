import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from './prisma.service';
@Injectable()
export class CartService {
  constructor(private prismaService: PrismaService) {}
  async getUserCart(user: User) {
    return await this.prismaService.cart.findFirst({
      where: { status: 'ONGOING', user },
    });
  }
}
