import { AuthService } from 'src/service/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   
  constructor( private authService: AuthService, private router:  Router){}

  canActivate(){
    // if(this.authService.loginCheck){
    //   console.log('canActivate');
    // return true;
    // }else{
    //   console.log('Not Valid');
    // return false;
    // }
    return true;
  }
  
}
