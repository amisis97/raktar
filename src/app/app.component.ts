import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private authService: AuthService
  ) {}

  title = 'raktar';
  isLoggedIn = this.authService.isLoggedIn;
  small = false;

  changeView() {
    document.querySelector('#');
    /*this.small = !this.small;
    setTimeout(() => window.dispatchEvent(new Event('resize')), 500);*/
  }
}

export function sameDay(d1: Date, d2: Date) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}
