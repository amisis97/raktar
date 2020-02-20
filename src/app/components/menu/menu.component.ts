import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  isLoggedIn = this.authService.isLoggedIn;

  menuItems = [
    {
      title: 'Menü1',
      url: '/menu1',
      icon: '/icon.png'
    },
    {
      title: 'Menü2',
      url: '/menu2',
      icon: '/icon2.png'
    }
  ];

  ngOnInit() {

  }

  logout() {
    this.authService.logout();
  }

}
