import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  async login(email: string, password: string) {
    const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    window.location.replace('/home');
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    window.location.replace('/login');
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  get getUserId(): string {
    if (!this.isLoggedIn) {
      return null;
    }
    const user = this.getUser();
    return user.uid;
  }

  get isLoggedIn(): boolean {
    const user = this.getUser();
    if (user) {
      return true;
    }
    return false;
  }

}
