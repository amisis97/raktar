import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { Database } from 'src/app/database.service';
import firebase from 'firebase';
import { User } from 'src/app/interfaces/User';

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
  isLoggedIn: boolean;
  userName: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private db: Database
  ) { }
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
    if (this.isLoggedIn) {
      this.db.getUser(this.authService.getUserId).subscribe(user => {
        this.user = user as User;
      });
    }
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
