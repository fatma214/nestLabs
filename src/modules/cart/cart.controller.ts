import { Controller, Post, Body, Param, Get, Delete, Patch, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDTO } from './dto/cart.dto';
import { Types } from 'mongoose';
import { AuthGuard } from 'src/core/guards/auth.guard';

@Controller('carts')
export class CartController {
    constructor(private _cartService: CartService) { }

    @Post()
   
    async createCart(@Body() createCartDTO: CreateCartDTO) {
      return await this._cartService.createCart(createCartDTO);
    }
    @Get(':userId')
    async getCart(@Param('userId') userId: string) {
        return await this._cartService.getCartByUserId(userId);
    }

    @Post(':userId')
    async addToCart(@Param('userId') userId: string,@Body('bookId') bookId: string) {
      return await this._cartService.addToCart(userId, bookId);
    }
    @Patch(':bookId')
    async updateCartQuantity(
      @Param('bookId') bookId: string,
      @Body('userId') userId: string,
      @Body('quantity') quantity: number,
    ) {
      return this._cartService.updateCartQuantity(userId, bookId, quantity);
    }
    
  //delete book from cart
  @Delete(':bookId')
  async removeBookFromCart(
    @Param('bookId') bookId: string,
    @Body('userId') userId: string,
  ) {
    return this._cartService.removeBookFromCart(userId, bookId);
  }
  

}