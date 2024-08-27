import { Injectable } from "@nestjs/common";
import { signUpDTO } from "../dto/Auth.dto";

@Injectable()
export class SignUpService {
  users = [
 
  ];

   signUp(signUpData: signUpDTO) {
    const { name, email, password } = signUpData;

   
    const existingUser = this.users.find((user) => user.email === email);
    if (existingUser)  
        return  {
            "message":'User with this email already exists'
      } 
    

    
    const lastUser = this.users[this.users.length - 1];
    const newId = lastUser ? lastUser.id + 1 : 1;
 
    const newUser = {
      id: newId, 
      name,
      email,
      password:password
    };
 
    this.users.push(newUser);

    return {
      message: 'User successfully registered',
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    };
  }


  getAllUsers(){
    return {
        "message":"success",
        "users":this.users
    }
  }

}
