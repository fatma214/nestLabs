import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { signInDTO } from '../dto/Auth.dto';
import { Model } from 'mongoose';
import { User } from 'src/core/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SigninService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,
private _JwtService:JwtService) {}

  async signin(signInData: signInDTO) {
    const { email, password } = signInData;
    let user = await this.userModel.findOne({ email: signInData.email });

    if (user && (await bcrypt.compare(signInData.password, user.password))) {
        let token =this._JwtService.sign({name:user.name,email:user.email,id:user._id},{secret:"secretKey"})
      return  {message:"welcome",token:token}
    } else {
      throw new HttpException('Email or password wrong', HttpStatus.BAD_REQUEST);
    }
  }
}
