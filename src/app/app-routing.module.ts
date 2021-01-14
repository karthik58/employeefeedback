import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesComponent } from './employees/employees.component'
import { AddEmployeeComponent } from './add-employee/add-employee.component'
import { EditEmployeeComponent } from './edit-employee/edit-employee.component'

import { LoginComponent } from './login/login.component';

const routes: Routes = [

  {
    path: 'employees',
    component: EmployeesComponent,
    data: { title: 'List of employees' }
  },

  {
    path: 'add-employee',
    component: AddEmployeeComponent,
    data: { title: 'Add Employee' }
  },
  {
    path: 'edit-employee/:id',
    component: EditEmployeeComponent,
    data: { title: 'Edit Employee' }
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  // {
  //   path:'',
  //   component: LoginComponent,
  //   data: { title: 'Login' }
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
