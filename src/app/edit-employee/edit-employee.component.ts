import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  
  emps
  projectList = ['Demo1', 'Demo2', 'Demo3'];

  empForm: FormGroup;

  _id = '';

  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) { }

  employeeID
  ngOnInit(): void {
    this.empForm = this.formBuilder.group({
      empid: [null, Validators.required],
      name: [null, Validators.required],
      project: [null, Validators.required],
      rating: [null, Validators.required],
      comments: [null, Validators.required],
    });
    this.emps = this.api.getEmps();
    this.employeeID = this.route.snapshot.params.id
    this.getEmpById(this.employeeID);

  }

  cases
  getEmpById(empid: any) {

    this.api.getTodoByID(empid).subscribe((data: any) => {
      this._id = data.empid;
      this.cases = data[0]
      console.log('data', data[0])
      this.empForm.patchValue({
        name: this.cases.name,
        empid: this.cases.empid,
        project: this.cases.project,
        rating: this.cases.rating,
        comments: this.cases.comments
      });
    });

  }


  onFormSubmit() {
    // console.log('1', this.empForm.value);

    // for (let i = 0; i < this.emps.length; i++) {

    //   if (this.emps[i].empid == this.employeeID) {
    //   console.log('emps[i]', this.emps[i].empid)

    //     this.emps[i] = this.empForm.value;
    //   }
    // }
    // console.log('edit', this.empForm.value)
    this.api.updateTodo(this.employeeID, this.empForm.value);
    this.router.navigate(['/employees'])


    // this.api.updateTodo(this.cases, this.casesForm.value)
    // this.router.navigate(['/employees'])
    // this.api.updateCases(this._id, this.casesForm.value)
    //   .subscribe((res: any) => {
    //       const id = res._id;
    //       this.isLoadingResults = false;
    //       this.router.navigate(['/cases-details', id]);
    //     }, (err: any) => {
    //       console.log(err);
    //       this.isLoadingResults = false;
    //     }
    //   );
  }


}
