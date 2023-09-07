import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CategoryDto } from 'src/data/category/category.dto';
import { UniqueCategoryException } from 'src/exceptions/category/uniqueCategory.exception';
export type Hierarchy = {
  name: string;
  children: Hierarchy[];
  parentId: null | number;
  id: number;
};
@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}
  async findByCategory(id: number) {
    return await this.prismaService.category.findMany({
      where: { id },
      select: { id: true, articles: true },
    });
  }
  async findById(id: number) {
    const category = await this.prismaService.category.findFirstOrThrow({
      where: { id },
      include: {
        features: true,
        parentCategory: true,
      },
    });
    return category;
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
    return await this.prismaService.category.findUniqueOrThrow({
      where: { name },
      include: { childCategories: true },
    });
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
  async getAll() {
    const categories = await this.prismaService.category.findMany({
      orderBy: { id: 'asc' },
    });
    const lookup = new Map<number, Hierarchy>();
    categories.forEach((category) =>
      lookup.set(category.id, {
        children: [],
        parentId: category.parentId,
        id: category.id,
        name: category.name,
      }),
    );
    for (const category of categories) {
      if (category.parentId === null) continue;
      const parent = lookup.get(category.parentId);
      parent.children.push(lookup.get(category.id));
    }
    const rootCategories: Hierarchy[] = [];
    for (const [, value] of lookup) {
      if (value.parentId === null) rootCategories.push(value);
    }
    return rootCategories;
  }
}
