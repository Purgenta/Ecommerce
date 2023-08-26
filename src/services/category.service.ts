import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CategoryDto } from 'src/data/category/category.dto';
import { UniqueCategoryException } from 'src/exceptions/category/uniqueCategory.exception';
@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}
  async findById(id: number) {
    return await this.prismaService.category.findFirstOrThrow({
      where: { id },
      include: {
        features: true,
        parentCategory: true,
      },
    });
  }
  async addCategory(category: CategoryDto) {
    const { banner, name, parentId } = category;
    const existing = await this.findByName(name);
    if (existing) throw new UniqueCategoryException();
    this.findById(parentId);
    return await this.prismaService.category.create({
      data: {
        banner,
        name,
        parentId,
      },
    });
  }
  async findByName(name: string) {
    return await this.prismaService.category.findUnique({ where: { name } });
  }
  async editCategory(category: CategoryDto, id: number) {
    const { banner, name, parentId } = category;
    await this.findById(id);
    if (parentId) await this.findById(parentId);
    return await this.prismaService.category.update({
      where: { id },
      data: { banner, name, parentId },
    });
  }
  async deleteCategory(id: number) {
    return await this.prismaService.category.delete({ where: { id } });
  }
}
