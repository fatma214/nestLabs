import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { signUpDTO } from '../dto/Auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/core/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignUpService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signUp(signUpData: signUpDTO) {
    const user = await this.userModel.findOne({ email: signUpData.email });
    if (user)
      throw new HttpException('email aready exists', HttpStatus.CONFLICT);
      signUpData.password = await bcrypt.hash(signUpData.password, 8);
      
    const addedUser = await this.userModel.insertMany(signUpData);
    return { message: 'success', addedUser };
  }
}
