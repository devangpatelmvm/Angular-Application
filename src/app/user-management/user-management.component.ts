import { ViewDataDialogComponent } from './../view-data-dialog/view-data-dialog.component';
import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { DialogContentExampleDialogComponent } from './../dialog-content-example-dialog/dialog-content-example-dialog.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, OnInit, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';


export interface PeriodicElement {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: number;
  id: number
  action: any;
}

const ELEMENT_DATA: PeriodicElement[] = JSON.parse(localStorage.getItem('Users'));

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements AfterViewInit, OnInit {
  
  highlightedToken: any;
  dialogDelete: any;
  selectedRowIndex: any;
  selectedRowIndex1: any;
  role: any;
  // loggedinUserfirstName: string;
  loggedinUserlastName: string;
  fullName: string;
  view:any = [];
  
  displayedColumns: string[] = [ 'firstName',  'lastName', 'userName', 'email', 'phone', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    // dataSource = new MatTableDataSource([]);
  
  

  constructor(private _liveAnnouncer: LiveAnnouncer, 
             public dialog: MatDialog,
             private router:ActivatedRoute,
             ) 
             {   }


     dataReUpdate(){

      var Users = localStorage.getItem("Users");
      if (Users) {
        var parsedData = JSON.parse(localStorage.getItem("Users"));
        this.dataSource = new MatTableDataSource(parsedData);
      } else {
        localStorage.setItem("Users", JSON.stringify(ELEMENT_DATA));
        var parsedData = JSON.parse(localStorage.getItem("Users"));
        this.dataSource = new MatTableDataSource(parsedData);
      }

      // this.role = JSON.parse(localStorage.getItem("Users"));
      // console.log( 'role' + this.role);
     }
   
     loggedinUserfirstName = '';

  ngOnInit(): void {
        this.dataReUpdate();
        this.highlight();
        this.loggedinUserfirstName = localStorage.getItem('token1');
        const loggedinUserlastName = localStorage.getItem('token2');
        const fullName = this.loggedinUserfirstName + loggedinUserlastName;
        this.view = JSON.parse(localStorage.getItem('Users'));
        console.log(this.view);

        this.view.forEach(row => {

         if(row.firstName === this.loggedinUserfirstName  && row.lastName === loggedinUserlastName)
         {
        this.role=row.admin;
        }
    });

     
    
    }
    

    highlight(){

      this.highlightedToken = (localStorage.getItem('token1'));
      this.selectedRowIndex = this.highlightedToken;
    }

   @ViewChild(MatSort) sort: MatSort;
   @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
     

  }


   /** SORTING */
   announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

    /*  FILTER    */ 
  applyFilter(event: Event) 
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
         // For Delete Data
  openDialogDelete(element : number, i: any) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
        // width: '30%',
        data : element,
        id: i,
     });

     dialogRef.afterClosed().subscribe(() => {
      this.dataReUpdate();
      console.log('The dialog was closed');
      
    });
     
  }
   

  //  For Edit/ Update Data
      openDialogEdit(element : number, i: any, ) {
      const dialogRef = this.dialog.open(DialogContentExampleDialogComponent, {
      height: '72%',
      width: '40%',
       data: element,
       
    });

    dialogRef.afterClosed().subscribe(() => {
      this.dataReUpdate();
      console.log('The dialog was closed');
      
    });

  }

  viewDataDialog(element : number, i: any, ) {
    this.dialog.open(ViewDataDialogComponent, {
      //  width: '20%',
      height: '45%',
      width: '40%',
      data: element,
       
    });
  }




  
}