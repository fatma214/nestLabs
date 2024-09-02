import { IsMongoId, IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export default class AddPostDTO{
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    title:string;

    @IsString()
    @MinLength(3)
    @MaxLength(300)
    info:string;


    @IsMongoId()
    @IsOptional()
    userId:string

}

export class PostParamDTO{
    @IsMongoId()
    id:string
}