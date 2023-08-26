import { Controller, Post, Delete, Body } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { PriceDto } from 'src/data/price/price.dto';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Roles } from 'src/decorators/role.decorator';
import { PriceService } from 'src/services/price.service';
@Controller('price')
export class PriceController {
  constructor(private priceService: PriceService) {}
  @Roles('ADMIN')
  @Post('addprice')
  async addProductPrice(@Body() price: PriceDto) {
    try {
      return await this.priceService.addPrice(price.articleId, price.value);
    } catch (error) {
      throw new BadRequestException();
    }
  }
  @Roles('ADMIN')
  @Delete('deleteprice/:id')
  async deleteProductPrice(@Param('id') id: number) {
    try {
      return await this.priceService.deletePrice(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
