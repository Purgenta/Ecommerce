import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Put,
} from '@nestjs/common/decorators';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';
import { CategoryDto } from 'src/data/category/category.dto';
import { Roles } from 'src/decorators/role.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { CategoryService } from 'src/services/category.service';
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get('find/:id')
  async findCategory(@Param('id') id: number) {
    try {
      return await this.categoryService.findById(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException("Category doesn't exist");
      } else throw new InternalServerErrorException();
    }
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Post('add')
  async addCategory(@Body() categoryDto: CategoryDto) {
    try {
      return await this.categoryService.addCategory(categoryDto);
    } catch (error) {
      if (error instanceof Error) throw new BadRequestException(error.message);
      throw new InternalServerErrorException();
    }
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Put('edit/:id')
  async editCategory(@Body() category: CategoryDto, @Param('id') id: number) {
    try {
      return await this.categoryService.editCategory(category, id);
    } catch (error) {
      if (error instanceof Error) throw new BadRequestException(error.message);
      throw new InternalServerErrorException();
    }
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return await this.categoryService.deleteCategory(id);
  }
  async addFeature() {}
}
