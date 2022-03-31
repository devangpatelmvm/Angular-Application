import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/service/user-service.service';
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  user: any = {};
  userSubmitted: boolean;
  checked = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createRegristrationForm();
  }
  createRegristrationForm() {
    this.registrationForm = this.fb.group(
      {
        firstName: [null,[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z ]*$'),], ],
        lastName: [null,[ Validators.required,Validators.minLength(1),Validators.pattern('^[a-zA-Z ]*$') ],],
        userName: [null, [Validators.required, Validators.minLength(3)]],
        email: [null, [Validators.required, Validators.email]],
        phone: [null, [Validators.required, Validators.pattern('[0-9 ]{10}')]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirmPassword: [null, Validators.required],
        admin: [false]
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  // Get Data From Input Feilds
  get firstName() {
    return this.registrationForm.get('firstName') as FormControl;
  }
  get lastName() {
    return this.registrationForm.get('lastName') as FormControl;
  }
  get userName() {
    return this.registrationForm.get('userName') as FormControl;
  }
  get email() {
    return this.registrationForm.get('email') as FormControl;
  }
  get phone() {
    return this.registrationForm.get('phone') as FormControl;
  }
  get password() {
    return this.registrationForm.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }
  get admin() {
    return this.registrationForm.get('admin') as FormControl;
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    this.userSubmitted = true;
    if (this.registrationForm.valid) {
      this.user = Object.assign(this.user, this.registrationForm.value);
      this.userService.addUser(this.user);
      this.registrationForm.reset();
      this.userSubmitted = false;
      alert('Registration Done');
      this.router.navigate(['./login']);
    }
  }
}
