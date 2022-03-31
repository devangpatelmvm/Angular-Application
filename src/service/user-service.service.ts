import { Injectable } from '@angular/core';
// import { User } from 'src/app/model/User';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }
  addUser(user: any) {
    let users = [];
    if(localStorage.getItem('Users')) {
      users =JSON.parse(localStorage.getItem('Users'));
      users = [user, ...users];
    } else{
      users = [user];
    }
    // user.push(this.userObj);
    localStorage.setItem('Users', JSON.stringify(users));
  }
  
}



