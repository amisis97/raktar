import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Database } from 'src/app/database.service';
import { User } from 'firebase';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  user: any;

  constructor(
    private authService: AuthService,
    private db: Database,
  ) {
    this.db.getUser(this.authService.getUserId).subscribe(user => {
      this.user = user;
      console.log(user);
    });
  }

  isLoggedIn = this.authService.isLoggedIn;

  menuItems = [
    {
      title: 'Kezdőlap',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Partnerek',
      url: '/partners',
      icon: 'supervised_user_circle'
    },
    {
      title: 'Raktár',
      url: '/raktar',
      icon: 'domain'
    },
    {
      title: 'Bevételezés',
      url: '/products',
      icon: 'add_box'
    }
  ];

  ngOnInit() {

  }

  getCurrentUser() {

  }

  logout() {
    this.authService.logout();
  }

}
