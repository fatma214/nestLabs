import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class  signUpDTO {
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @IsNotEmpty()
    password: string;
}


 
export class signInDTO {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}
