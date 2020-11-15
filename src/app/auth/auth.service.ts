import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(public afAuth: AngularFireAuth, private router: Router, private snackBar: MatSnackBar) {
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
    const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      this.snackBar.open('Sikeres bejelentkezés!', null, {
        duration: 1000,
      }).afterDismissed().subscribe(() => {
        window.location.replace('/home');
      });
    })
    .catch((error) => {
      let errorStr = '';
      if (error.code === 'auth/wrong-password') {
        errorStr = 'Hibás email cím vagy jelszó!';
      } else if (error.code === 'auth/user-not-found') {
        errorStr = 'Hibás email cím vagy jelszó!';
      }
      errorStr += ' Próbáld újra!';
      this.snackBar.open(errorStr, null, {
        duration: 2000,
      });
    });
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
