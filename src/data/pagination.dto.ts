import { IsNumber, Min } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @Min(0)
  page: number;
  @IsNumber()
  @Min(1)
  size: number;
}
