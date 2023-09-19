import {
  Controller,
  Body,
  Post,
  Delete,
  Get,
  ParseIntPipe,
  Param,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { WishListService } from 'src/services/wish.list.service';
import { Client } from 'src/decorators/user.decorator';
import { User } from '@prisma/client';
import { AddWishListItemDto } from 'src/data/wishlist/wish.list.dto';
@Controller('wishlist')
export class WishListController {
  constructor(private wishListService: WishListService) {}
  @Get('wishlist')
  async getWishList(@Client() user: User) {
    return this.wishListService.getWishList(user);
  }
  @Delete('removeitem/:id')
  async removeWishListItem(
    @Param('id', ParseIntPipe) id: number,
    @Client() user: User,
  ) {
    try {
      return await this.wishListService.addItem(user, id);
    } catch (error) {
      if (error instanceof Error) throw new BadRequestException(error.message);
      else throw new InternalServerErrorException();
    }
  }
  @Post('additem')
  async addWishListItem(
    @Body() data: AddWishListItemDto,
    @Client() user: User,
  ) {
    try {
      return await this.wishListService.addItem(user, data.articleId);
    } catch (error) {
      if (error instanceof Error) throw new BadRequestException(error.message);
      else throw new InternalServerErrorException();
    }
  }
}
