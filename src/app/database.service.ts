import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class Database {

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    public db: AngularFirestore
    ) { }

    getUsers() {
      return this.db.collection('users').valueChanges();
    }

    getUser(id: string) {
      const c = 'users/' + id;
      return this.db.doc(c).valueChanges();
    }
}
