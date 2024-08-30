import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post, PostsSchema } from 'src/core/schemas/posts.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostsSchema }])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
