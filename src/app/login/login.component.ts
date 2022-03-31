
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   
  constructor(  private router: Router , private authService: AuthService) { }

  ngOnInit(){
   
  }
    onLogin(loginForm: NgForm)
    {
      console.log(loginForm.value)
     const token = this.authService.authUser(loginForm.value);
      if (token){
        localStorage.setItem('token', token.userName)
        localStorage.setItem('token1', token.firstName)
        localStorage.setItem('token2', token.lastName)
        // alert('Login Successful');
        console.log('Login SuccessFul');
        this.router.navigate(['./dash-board']);
      } else
      {
        alert('Invalid Login Credentials')
        let ab;
         ab = JSON.parse(localStorage.getItem('Users'));
         console.log(ab);
      }
    }
    


}
