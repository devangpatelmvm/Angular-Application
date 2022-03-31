// import { element } from 'protractor';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {

  message: string = "Are you sure to delete this item?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  deleted: [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public openDialogDelete: any,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AlertDialogComponent>) {
      
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
      const  deleted = JSON.parse(localStorage.getItem('Users'));
      deleted.splice(this.openDialogDelete, 1);
      this.openDialogDelete = deleted;
      console.log(this.openDialogDelete);
      localStorage.setItem("Users", JSON.stringify(this.openDialogDelete));
      // window.location.reload();
      this.openSnackBar('User Data Deleted!!!', 'Cancel'),
      {
        duration: 5000,
      };
      // window.location.reload();
  }

  ngOnInit(): void {
    // this.onConfirmClick();

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000, verticalPosition: "bottom", 
                                 horizontalPosition: "right",  panelClass: ["custom-style"] }, );
  }
  
}


