import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';  
import { User } from './user.schema';
 

@Schema({ timestamps: true, versionKey: false })
export class Wishlist  {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop([{ type: Types.ObjectId }])
  books: Types.ObjectId[];
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);
