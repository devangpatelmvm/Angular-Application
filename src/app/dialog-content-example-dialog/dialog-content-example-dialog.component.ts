import { id } from 'date-fns/locale';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserManagementComponent } from '../user-management/user-management.component';


@Component({
  selector: 'app-dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.component.html',
  styleUrls: ['./dialog-content-example-dialog.component.css']
})
export class DialogContentExampleDialogComponent implements OnInit {
  editForm: FormGroup;
  // Users: [];
  public tasks=[];
  
  check:boolean=false;
  constructor(  private formBuilder: FormBuilder,
                 @Inject(MAT_DIALOG_DATA) public openDialogEdit: any,
                 private _snackBar: MatSnackBar,
                 public dialogRef: MatDialogRef<DialogContentExampleDialogComponent> ,
                 public router:ActivatedRoute,
                 ) { } 

  ngOnInit(): void {
    console.log(this.openDialogEdit);
    
    this.editForm = this.formBuilder.group(
      {
        firstName:[null,[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z ]*$'),], ],
        lastName: [null,[ Validators.required,Validators.minLength(1),Validators.pattern('^[a-zA-Z ]*$') ],],
        userName: [null, [Validators.required, Validators.minLength(3)]],
        email:    [null, [Validators.required, Validators.email]],
        phone:    [null, [Validators.required, Validators.pattern('[0-9 ]{10}')]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirmPassword: [null, Validators.required],

      });

        //  for Display Data Into Fields
      if(this.openDialogEdit){
      this.editForm.controls['firstName'].setValue(this.openDialogEdit.firstName);
      this.editForm.controls['lastName'].setValue(this.openDialogEdit.lastName);
      this.editForm.controls['userName'].setValue(this.openDialogEdit.userName);
      this.editForm.controls['email'].setValue(this.openDialogEdit.email);
      this.editForm.controls['phone'].setValue(this.openDialogEdit.phone);
      }
      
  }



    // Get Data From Input Feilds // Validation
    get firstName() {
      return this.editForm.get('firstName') as FormControl;
    }
    get lastName() {
      return this.editForm.get('lastName') as FormControl;
    }
    get userName() {
      return this.editForm.get('userName') as FormControl;
    }
    get email() {
      return this.editForm.get('email') as FormControl;
    }
    get phone() {
      return this.editForm.get('phone') as FormControl;
    }
    get password() {
      return this.editForm.get('password') as FormControl;
    }
    get confirmpassword() {
      return this.editForm.get('confirmPassword') as FormControl;
    }

    
  updateUser(){
    // this.dialogRef.close(true);
     let Users = JSON.parse(localStorage.getItem('Users'));

     if( this.editForm.get('password').value === Users.password ){
      this.openSnackBar('User Data Updated', 'Cancel'),
        {
          duration: 4000,
        };
    }else{
      this.openSnackBar('Worng MisMatch!!!', 'Cancel'),
      {
        duration: 4000,
      };
    }

        for (let index = 0; index < Users.length; index++) {
          if(this.editForm.get('email').value === Users[index].email  &&
             this.editForm.get('password').value === Users[index].password  ){
            console.log(Users[index]);
            Users[index].firstName = this.editForm.get('firstName').value;
            Users[index].lastName = this.editForm.get('lastName').value;
            Users[index].phone = this.editForm.get('phone').value;
            this.openSnackBar('User Data Updated', 'Cancel'),
            {
              duration: 4000,
            };

          }
        }
        
        localStorage.setItem('Users',JSON.stringify(Users));


        
      }
 

  // Notification Code
         openSnackBar(message: string, action: string) {
         this._snackBar.open(message, action, { duration: 3000, verticalPosition: "bottom", 
                                                horizontalPosition: "right", 
                                                panelClass: ["custom-style"] },);
                                                
  }



}
