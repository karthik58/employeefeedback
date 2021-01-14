import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';

// import { Employee } from '../employee';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  emps

  displayedColumns: string[] = [ 'project', 'rating', 'comments', 'actions'];
  recs = new MatTableDataSource([]);
  // data: Employee[] = [];
  isLoadingResults = true;

  constructor(private api: ApiService) { }

  getAllEmployees(){
    this.emps = this.api.getEmps();
  }

  ngOnInit(): void {
    this.getAllEmployees()
  }

  deleteEmp(id) {
    for(let i = 0; i < this.emps.length; i++) {
      if(this.emps[i].empid == id) {
          this.emps.splice(i, 1);
      }
    }
    this.api.deleteEmployee(id);
    this.getAllEmployees()
  }

}
