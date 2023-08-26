import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FeatureDto {
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
  @IsNotEmpty()
  @IsString()
  name: string;
}
