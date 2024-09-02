// src/modules/wishlist/wishlist.module.ts
import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Wishlist, WishlistSchema } from 'src/core/schemas/wishlist.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name:Wishlist.name, schema: WishlistSchema }])],

controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
