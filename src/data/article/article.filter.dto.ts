import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
class Feature {
  @IsNumber()
  id: number;
  @IsArray()
  values: string[];
}
export class ArticleFilterDto {
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  fromPrice: number;
  @Min(0)
  @Type(() => Number)
  page: number;
  @Min(1)
  @Type(() => Number)
  size: number;
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  toPrice: number;
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsArray()
  producerId: number[];
  @IsString()
  @IsNotEmpty()
  categoryName: string;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Feature)
  features: Feature[];
  orderBy: 'price' | 'name';
  orderDirection: 'asc' | 'desc';
}
