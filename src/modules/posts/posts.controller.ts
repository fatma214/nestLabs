import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import AddPostDTO, { PostParamDTO } from './dto/post.dto';
import { AuthGuard } from 'src/core/guards/auth.guard';
@UseGuards(AuthGuard)
@Controller('posts')
export class PostsController {
    constructor (private _postsService:PostsService){
    
    }
    @Get()
    getAllPosts(){
        return this._postsService.getPosts()
    }

    @Post()
    addPost(@Body() body:AddPostDTO,@Req() req:any ){
        body.userId=req['userId']
        return this._postsService.addPost(body)
    }

    @Put(":id")
    updatePost(@Body() body:AddPostDTO, @Param() param: PostParamDTO){
        return this._postsService.updatePost(body,param.id)
    }

    @Delete(":id")
    deletPost(@Param() param: PostParamDTO){
        return this._postsService.delete(param.id)
    }

    
}
