import { IsNumber } from 'class-validator';

export class AddWishListItemDto {
  @IsNumber()
  articleId: number;
}
