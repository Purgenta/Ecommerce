import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsNumber()
  parentId?: number;
  banner: string;
}
