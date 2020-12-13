import { Component } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';
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
  isMobile: boolean;

  ngOnInit() {
    this.small = localStorage.getItem('view') ? JSON.parse(localStorage.view) : false;
    this.isLoggedIn = this.authService.isLoggedIn;
    this.iconName = 'menu_open';
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    document.addEventListener('gesturestart', function (e) {
      e.preventDefault();
    });
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

export function toDateString(date: Date) {
  return date.toISOString().split('T')[0];
}

export class MatPaginatorIntlHu extends MatPaginatorIntl {
  itemsPerPageLabel = 'Oldalméret';
  nextPageLabel     = 'Következő oldal';
  previousPageLabel = 'Előző oldal';
  lastPageLabel = 'Utolsó oldal';
  firstPageLabel = 'Első oldal';
}
