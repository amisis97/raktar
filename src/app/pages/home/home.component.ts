import { Component, OnInit, DoBootstrap } from '@angular/core';
import { Database } from 'src/app/database.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:  [ Database ]
})
export class HomeComponent implements OnInit {

  email = '';

  constructor(
    private db: Database,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.auth.getUser()
    .subscribe(res => {
      let uid = res.uid;
      let user = this.db.getUser(uid);
      console.log(user);
    });
  }

  getUsers = () =>
      this.db.getUsers()
      .subscribe(res => console.log(res));

}
