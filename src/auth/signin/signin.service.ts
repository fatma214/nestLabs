import { Injectable } from '@nestjs/common';
import { signInDTO } from '../dto/Auth.dto';
import { SignUpService } from '../signup/signup.service';

@Injectable()
export class SigninService {
    constructor(private signUpService: SignUpService) {}

    signin(signInData: signInDTO) {
        const { email, password } = signInData;

         
        const user = this.signUpService.users.find(user => user.email === email);
        if (!user) {
            return {
                message: 'User not found',
            };
        }

       
        if (user.password !== password) {
            return {
                message: 'incorrect password',
            };
        }

       
        return {
            message: 'Sign in successful',
            user: { id: user.id, name: user.name, email: user.email },
        };
    }
}
