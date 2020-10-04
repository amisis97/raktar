import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Database } from 'src/app/database.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import firebase from 'firebase';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private db: Database,
    public router: Router
  ) {
  }

  @Input()
  hideProfile: boolean;

  user: User;
  userImg: string;

  isLoggedIn = this.authService.isLoggedIn;

  menuItems = [
    {
      title: 'Kezdőlap',
      url: '/home',
      icon: 'home',
      visibility: ['admin', 'worker']
    },
    {
      title: 'Partnerek',
      url: '/partners',
      icon: 'supervised_user_circle',
      visibility: ['admin', 'worker']
    },
    {
      title: 'Raktár',
      url: '/raktar',
      icon: 'domain',
      visibility: ['admin']
    },
    {
      title: 'Termékek',
      url: '/products',
      icon: 'category',
      visibility: ['admin', 'worker']
    },
    {
      title: 'Bevételezés',
      url: '/receipts',
      icon: 'add_box',
      visibility: ['admin', 'worker']
    },
    {
      title: 'Eladás',
      url: '/sell',
      icon: 'shop',
      visibility: ['admin', 'worker']
    },
    {
      title: 'Raktárosok',
      url: '/workers',
      icon: 'transfer_within_a_station',
      visibility: ['admin']
    },
    {
      title: 'Statisztika',
      url: '/stat',
      icon: 'equalizer',
      visibility: ['admin']
    },
  ];

  ngOnInit() {
    this.user = null;
    this.db.getUser(this.authService.getUserId).subscribe(user => {
      const tempUser = user as User;
      if (typeof(tempUser.img) !== 'undefined' && tempUser.img !== '') {
        const storage = firebase.storage();
        storage.refFromURL(tempUser.img).getDownloadURL().then(url => {
          tempUser.img = url;
        });
      } else {
        tempUser.img = 'assets/user.svg';
      }
      this.user = tempUser;
    });
  }

  logout() {
    this.authService.logout();
  }

}
