import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from './interfaces/Product';
import { Partner } from './interfaces/Partner';
import { Area } from './interfaces/Area';

@Injectable({
  providedIn: 'root'
})
export class Database {

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    public db: AngularFirestore
    ) { }

    // User metodusok

    getUsers() {
      return this.db.collection('users').valueChanges();
    }

    getUser(id: string) {
      const c = 'users/' + id;
      return this.db.doc(c).valueChanges();
    }

    // Todo metodusok

    getTasks() {
      return this.db.collection('tasks').valueChanges({idField: 'taskId'});
    }

    addTask(task) {
      this.db.collection('tasks').add(task);
    }

    deleteTask(taskId) {
      const c = 'tasks/' + taskId;
      this.db.doc(c).delete();
    }

    editTask(taskId, task) {
      const c = 'tasks/' + taskId;
      this.db.doc(c).set(task);
    }

    // Raktarak metodusok

    getAreas() {
      return this.db.collection('warehouse').valueChanges({idField: 'areaId'});
    }

    getArea(id: string) {
      const c = 'warehouse/' + id;
      return this.db.doc(c).valueChanges();
    }

    addArea(area: Area) {
      this.db.collection('warehouse').add(area);
    }

    deleteArea(areaId: string) {
      const c = 'warehouse/' + areaId;
      this.db.doc(c).delete();
    }

    // Termekek metodusok

    getProducts() {
      return this.db.collection('products').valueChanges({idField: 'pID'});
    }

    getProduct(pId: string) {
      const c = 'products/' + pId;
      return this.db.doc(c).valueChanges();
    }

    deleteProduct(pId: string) {
      const c = 'products/' + pId;
      this.db.doc(c).delete();
    }

    editProduct(pId: string) {

    }

    // Partnerek metodusok

    getPartners() {
      return this.db.collection('partners').valueChanges({idField: 'pID'});
    }

    getPartner(pId: string) {
      const c = 'partners/' + pId;
      return this.db.doc(c).valueChanges();
    }

    deletePartner(pId: string) {
      const c = 'partners/' + pId;
      this.db.doc(c).delete();
    }

    editPartner(pId: string) {

    }

    // Raktarosok

    getWorkers() {
      return this.db.collection('workers').valueChanges({idField: 'wID'});
    }

    getWorker(wID: string) {
      const c = 'workers/' + wID;
      return this.db.doc(c).valueChanges();
    }

    deleteWorker(wID: string) {

    }

    editWorker(wID: string) {

    }

    // Statisztika

    getBuyStat() {
      return this.db.collection('buy').valueChanges({idField: 'bID'});
    }

    getSellStat() {
      return this.db.collection('sell').valueChanges({idField: 'sID'});
    }
}
