import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  ValidateNested,
} from 'class-validator';
export class FeatureDTO {
  @IsNumber()
  featureId: number;
  @IsNotEmpty()
  @IsString()
  value: string;
}
export class ArticleDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FeatureDTO)
  features: FeatureDTO[];
  @IsNumber()
  categoryId: number;
  @IsNumber()
  price: number;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNumber()
  producerId: number;
  @IsString()
  @IsNotEmpty()
  model: string;
}
