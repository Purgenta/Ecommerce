import { IsNumber, Min } from 'class-validator';

export class PriceDto {
  @IsNumber()
  @Min(1)
  value: number;
  @IsNumber()
  articleId: number;
}
