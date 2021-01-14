import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable } from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  emps
  projectList = ['Demo1', 'Demo2', 'Demo3'];
  value: Observable<number>;

  empForm: FormGroup;

  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.empForm = this.formBuilder.group({
      empid: [null, Validators.required],
      name: [null, Validators.required],
      project: [null, Validators.required],
      rating: [null, Validators.required],
      comments: [null, Validators.required],
    });
    this.value = this.empForm.controls.rating.valueChanges;

    this.emps = this.api.getEmps();
  }

  onFormSubmit() {
    this.emps.push(this.empForm.value)
    this.api.addTodo(this.empForm.value)
    this.router.navigate(['/employees']);
  }

}
