import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async findById(id: number) {
    return await this.prismaService.user.findUniqueOrThrow({
      where: { id },
      include: { carts: { include: { order: true, cartItems: true } } },
    });
  }
}
