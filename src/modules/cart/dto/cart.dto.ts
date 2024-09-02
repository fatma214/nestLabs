import { IsArray, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
  


export class CreateCartDTO {
  @IsMongoId()
  userId: Types.ObjectId;   
}

export class CartDTO {
  @IsMongoId()
  user: Types.ObjectId;

  @IsArray()
  @IsMongoId({ each: true })  
  books: Types.ObjectId[];

}
