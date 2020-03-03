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

  constructor(
    private db: Database,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.db.getUsers();
    this.db.getUser(id)
      .subscribe(res => {
         = res;
      });
  }

  getUsers() {
    this.db.getUsers()
      .subscribe(res => {
        return res;
      });
  }

  getUser(id) {
    return this.db.getUser(id)
      .subscribe(res => {
        this.user = res;
      });
  }


}
