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

  @Input()
  hideProfile: boolean;

  user: User;
  userImg: string;

  constructor(
    private authService: AuthService,
    private db: Database,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.db.getUser(this.authService.getUserId).subscribe(user => {
      const tempUser = user as User;
      if (typeof(tempUser.img) !== 'undefined') {
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
      title: 'Termékek',
      url: '/products',
      icon: 'category'
    },
    {
      title: 'Bevételezés',
      url: '/receipts',
      icon: 'add_box'
    },
    {
      title: 'Raktárosok',
      url: '/workers',
      icon: 'transfer_within_a_station'
    },
    {
      title: 'Statisztika',
      url: '/stat',
      icon: 'equalizer'
    },
  ];

  logout() {
    this.authService.logout();
  }

}
