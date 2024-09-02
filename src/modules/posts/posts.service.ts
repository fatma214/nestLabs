import { Injectable, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/core/schemas/posts.schema';
import AddPostDTO, { PostParamDTO } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}
async  getPosts() {
    const allPosts = await this.postModel.find().populate("userId")
    return  {message:"Done",allPosts}
   }

  async addPost(body: AddPostDTO) {
    const addedPost = await this.postModel.insertMany(body);
    return { message: 'Added successfully', addedPost };
  }

  async updatePost (body:AddPostDTO,id:string){
    const updated =await this.postModel.findByIdAndUpdate(id,body,{new:true})
    return { message: 'updated successfully', updated };

  }
  async delete (id:string){
       const deleted =await this.postModel.findByIdAndDelete(id,{new:true})
    return { message: 'deleted successfully', deleted };

  }
}
