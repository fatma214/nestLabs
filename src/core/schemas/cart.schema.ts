import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Cart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: mongoose.Types.ObjectId;

  @Prop({
    type: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
        quantity: { type: Number},
      },
    ],
    default: [],
  })
  books: { _id: mongoose.Types.ObjectId; quantity: number }[];

  @Prop({ type: Number, default: 0 })
  totalPrice: number;

  @Prop({ type: Number, default: 0 })
  numOfCartItems: number;

}

export const CartSchema = SchemaFactory.createForClass(Cart);
