import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistDTO } from './dto/wishlist.dto';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

@Controller('wishlists')
export class WishlistController {
  constructor(private _wishlistService: WishlistService) {}

  @Post()
  async createWishlist(@Body() wishlistDTO: WishlistDTO) {
     return  this._wishlistService.createWishlist(wishlistDTO);
  }

  @Get(':userId')
  async getWishlist(@Param('userId') userId: string) {
       return await this._wishlistService.getWishlistByUserId(userId);
  }

  // @Delete()
  // async deleteWishList(@Param('userId') userId: string){
  //         return await this._wishlistService.deleteWishList(userId)
  // }

}
