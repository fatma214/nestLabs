import { Body, Controller, Post } from '@nestjs/common';
import { signInDTO } from '../dto/Auth.dto';
import { SigninService } from './signin.service';

@Controller('signin')
export class SigninController {
    constructor(private signinService: SigninService) {}

    @Post()
    login(@Body() body: signInDTO) {
        return this.signinService.signin(body);
    }
}
