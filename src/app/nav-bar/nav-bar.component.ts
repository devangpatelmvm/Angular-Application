import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedinUserfirstName: string;
  loggedinUserlastName: string;
  loggedinUser: string;

 
  
  constructor(private router: Router,private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.loggedinUserfirstName = localStorage.getItem('token1');
    this.loggedinUserlastName = localStorage.getItem('token2');
    this.loggedinUser = localStorage.getItem('token');
    if(this.loggedinUser){

        console.log('Current User Is Available');
    }
    else{ 
         this.openSnackBar('No user details found...','Cancel'),{
          duration: 3000,
        };
          this.router.navigate(['./login']);
         }
  }
   

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {"duration": 3000},);
  }

  dayDisplay(){
    var today = new Date()
    var curHr = today.getHours()
    if (curHr < 12) {
      return 'Good Morning';
    } else if (curHr < 16) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }
 
  onLogout(){
    console.log('Logout');
    this.router.navigate(['./login']);
    localStorage.removeItem('token1');
    localStorage.removeItem('token2');
    return localStorage.removeItem('token');
  }
}
