import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common/decorators';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';
import { FeatureDto } from 'src/data/feature/feature.dto';
import { CategoryDto } from 'src/data/category/category.dto';
import { Roles } from 'src/decorators/role.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { CategoryService } from 'src/services/category.service';
import { CategoryFeatureService } from 'src/services/categoryFeature.service';
import { Public } from 'src/decorators/public.decorator';
@Controller('category')
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private categoryFeatureService: CategoryFeatureService,
  ) {}
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
  @Post('addfeature')
  async addFeature(@Body() feature: FeatureDto) {
    return await this.categoryFeatureService.addFeature(feature);
  }
  @Delete('deletefeature:id')
  async deleteFeature(@Param('id') id: number) {
    return await this.categoryFeatureService.deleteFeature(id);
  }
  @Get('findall')
  @Public()
  async getAll() {
    return await this.categoryService.getAll();
  }
  @Get('findbyname')
  @Public()
  async findByName(@Query('name') name: string) {
    const categoryName = decodeURI(name.toLowerCase());
    try {
      return this.categoryService.findByName(categoryName);
    } catch (error) {
      if (error instanceof Error) throw new BadRequestException(error.message);
    }
  }
  @Get('findcategoryfeature&values')
  @Public()
  async findCategoryFeatureValues(@Query('name') name: string) {
    try {
      return await this.categoryFeatureService.getCategoryFeatureValues(name);
    } catch (error) {
      if (error instanceof Error) throw new BadRequestException(error.message);
      throw new InternalServerErrorException(error);
    }
  }
}
