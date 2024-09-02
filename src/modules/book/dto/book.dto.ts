import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateBookDTO {
  @IsString()
  @IsNotEmpty()
   title: string;

  @IsNumber()
  @IsNotEmpty()
   price: number;

  @IsNumber()
  @IsNotEmpty()
   stock: number;

  @IsString()
  @IsOptional()
   description: string;
}
