import { Module } from '@nestjs/common';
import { SignupController } from './signup/signup.controller';
import { SigninController } from './signin/signin.controller';
import { SigninService } from './signin/signin.service';
import { SignUpService } from './signup/signup.service';
import { User, UserSchema } from 'src/core/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
 
 

@Module({
  imports:[MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [SignupController,SigninController],
  providers: [SigninService,SignUpService,JwtService]
})
export class AuthModule {}
