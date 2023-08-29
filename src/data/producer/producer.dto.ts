import { IsNotEmpty, IsString } from 'class-validator';

export class ProducerDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
