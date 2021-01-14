import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;

  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if(this.form.controls.username.value == 'employee' && this.form.controls.password.value == 'employee') {
        this.router.navigate(['employees']);
    }else {
      this.invalidLogin = true;
    }
  }

}
