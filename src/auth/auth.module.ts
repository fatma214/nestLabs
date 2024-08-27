import { Module } from '@nestjs/common';
import { SignupController } from './signup/signup.controller';
import { SigninController } from './signin/signin.controller';
import { SigninService } from './signin/signin.service';
import { SignUpService } from './signup/signup.service';
 
 

@Module({
  controllers: [SignupController,SigninController],
  providers: [SigninService,SignUpService]
})
export class AuthModule {}
