import { IsNumber, Min } from 'class-validator';

export class AddItemDto {
  @IsNumber()
  articleId: number;
  @IsNumber()
  @Min(1)
  quantity: number;
}
