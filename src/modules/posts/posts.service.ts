import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/core/schemas/posts.schema';

@Injectable()
export class PostsService {
   constructor(@InjectModel(Post.name) private postModel: Model<Post>){

   }
    getPosts(){
        return "hellow from posts"
    }
}
