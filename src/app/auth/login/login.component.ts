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
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  user: User;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    // redirect to home if already logged in
    /*if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }*/
  }

  username: string;
  password: string;

  ngOnInit() {
  }

  login(): void {
    this.authService.login(this.username, this.password);
  }

  logoutBtn() {
    this.authService.logout();
  }
}
