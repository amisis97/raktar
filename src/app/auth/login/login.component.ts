import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from 'firebase';
import { AuthService } from '../auth.service';
import { ErrorStateMatcher } from '@angular/material/core';

//import { AlertService, AuthenticationService } from '@/_services';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class InputErrorStateMatcherExample {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
}

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  user: User;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password);
    }
  }

  hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  logoutBtn() {
    this.authService.logout();
  }
}
