import { IsArray, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class WishlistDTO {
  @IsMongoId()
  user: Types.ObjectId;

  @IsArray()
  @IsMongoId({ each: true })  
  books: Types.ObjectId[];
}
