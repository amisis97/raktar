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
  isLoggedIn: boolean;
  small: boolean;
  iconName: string;

  ngOnInit() {
    this.small = localStorage.getItem('view') ? JSON.parse(localStorage.view) : false;
    this.isLoggedIn = this.authService.isLoggedIn;
    this.iconName = 'menu_open';
  }

  changeView() {
    this.small = !this.small;
    this.iconName = this.iconName === 'menu_open' ? 'menu' : 'menu_open';
    setTimeout(() => window.dispatchEvent(new Event('resize')), 500);
    localStorage.setItem('view', this.small.toString());
  }

}

export function sameDay(d1: Date, d2: Date) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}
