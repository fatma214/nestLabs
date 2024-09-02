import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { WishlistDTO } from './dto/wishlist.dto';
import { Wishlist } from 'src/core/schemas/wishlist.schema';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist.name) private readonly wishlistModel: Model<Wishlist>,
  ) {}

  async createWishlist(wishlistDTO: WishlistDTO) {
    const { user } = wishlistDTO;

    const existingWishlist = await this.wishlistModel.findOne({ user:user })

    if (existingWishlist) {
      throw new ConflictException('Wishlist already exists for this user.');
    }
 
    const newWishlist = new this.wishlistModel(wishlistDTO);
    await newWishlist.save();

    return {
      message: 'Wishlist created successfully',
      data: newWishlist,
    };
  }



  async getWishlistByUserId(userId: string) {
    const wishlist = await this.wishlistModel.findOne({ user: userId });
    
    if (!wishlist) {
      throw new NotFoundException('Wishlist not found for this user.');
    }
 

    return {
      message: 'Wishlist retrieved successfully',
      data: wishlist,
    };
  }

  // async deleteWishlist(userId: string) {
     
  //   const wishlist = await this.wishlistModel.findOneAndDelete({ user: userId });
  
 
  //   if (!wishlist) {
  //     throw new NotFoundException('Wishlist not found for this user.');
  //   }
  
  //   return {
  //     message: 'Wishlist deleted successfully',
  //     data: wishlist,
  //   };
  // }
  

  
}

 