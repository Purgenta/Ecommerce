import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsAlphanumeric,
  MinLength,
  MaxLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phoneNumber: string;
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(5)
  @MaxLength(20)
  password: string;
}
