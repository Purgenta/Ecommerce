import { Controller } from '@nestjs/common/decorators';
import {
  Post,
  Get,
  Delete,
  Body,
  Param,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { ArticleDto } from 'src/data/article/article.dto';
import { ArticleService } from 'src/services/article.service';
import { ArticleFilterDto } from 'src/data/article/article.filter.dto';
import { Public } from 'src/decorators/public.decorator';
@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}
  @Post('add')
  async addArticle(@Body() article: ArticleDto) {
    try {
      return await this.articleService.addArticle(article);
    } catch (error) {
      if (error instanceof Error) throw new BadRequestException(error.message);
      throw new InternalServerErrorException();
    }
  }
  @Get('filterproducts')
  @Public()
  async filterProducts(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    article: ArticleFilterDto,
  ) {
    return await this.articleService.filterArticles(article);
  }
  @Get('find/:id')
  async findById(@Param('id') id: number) {
    try {
      return await this.articleService.findItemById(id);
    } catch (error) {
      throw new NotFoundException('Specified article doesnt exist');
    }
  }
  @Delete('delete/:id')
  async deleteArticle(@Param('id') id: number) {
    return await this.articleService.deleteItem(id);
  }
}
