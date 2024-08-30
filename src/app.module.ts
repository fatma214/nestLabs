import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
 
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { PostsModule } from './modules/posts/posts.module';
 

@Module({
  imports: [ AuthModule,PostsModule,MongooseModule.forRoot('mongodb://localhost/nest_iti')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
  
}
