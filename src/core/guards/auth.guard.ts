import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _jwtService:JwtService){}
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    const req= context.switchToHttp().getRequest();
    const {token}=req.headers
    if(token){
      const decoded =this._jwtService.verify(token,{secret:"secretKey"});
      if(decoded){
        console.log(decoded);
        req["userId"]=decoded.id;
        return true;
      }else{
        
        return false
        
      }
    }
   
   
    
    return false;
  }
}
