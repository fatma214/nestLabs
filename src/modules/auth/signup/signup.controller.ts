import { Body, Controller, Get, Post } from '@nestjs/common';
import { signUpDTO } from '../dto/Auth.dto';
import { SignUpService } from './signup.service';

@Controller('signup')
export class SignupController {
     constructor(private   _signUpService:SignUpService){

     }
    @Post()
    register(@Body() body:signUpDTO){
        return  this._signUpService.signUp(body)
    }

    // @Get()
    // getUsers(){
    //     return this._signUpService.getAllUsers();
    // }
    
       

}
