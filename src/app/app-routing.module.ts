import { ViewDataDialogComponent } from './view-data-dialog/view-data-dialog.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { DialogContentExampleDialogComponent } from './dialog-content-example-dialog/dialog-content-example-dialog.component';


const routes: Routes = [
  
   {  path: '',              // Default 
      redirectTo: 'LoginComponent',
      pathMatch:'full'
    },

     { path: '',
    component: LoginComponent
     },
     {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    },
    {
      path: 'dash-board', 
      component:DashBoardComponent,
    },
    {
      path: 'nav-bar', 
      component: NavBarComponent,
    },
    {
      path: 'user-management', 
      component: UserManagementComponent,
    },
    {
      path: 'dialog-content-example-dialog', 
      component: DialogContentExampleDialogComponent,
    },
    {
      path: 'alert-dialog', 
      component: AlertDialogComponent,
    },
    {
      path: 'view-data-dialog', 
      component: ViewDataDialogComponent
    },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
