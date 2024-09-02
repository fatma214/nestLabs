import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
 
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { PostsModule } from './modules/posts/posts.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { CartModule } from './modules/cart/cart.module';
import { BookModule } from './modules/book/book.module';
 

@Module({
  imports: [ AuthModule,PostsModule,BookModule,CartModule,WishlistModule,MongooseModule.forRoot('mongodb://localhost/nest_iti')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
  
}
