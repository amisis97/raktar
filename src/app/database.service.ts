import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './interfaces/User';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from './interfaces/Product';
import { Partner } from './interfaces/Partner';
import { Area } from './interfaces/Area';
import { Sell } from './interfaces/Sell';
import { Buy } from './interfaces/Buy';
import { Warehouse } from './interfaces/Warehouse';
import { Worker } from './interfaces/Worker';

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

    addUser(user: User) {
      this.db.collection('users').doc(user.id).set(user);
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

    getWarehouses() {
      return this.db.collection('warehouse_list').valueChanges({idField: 'whId'});
    }

    getWarehouse(whId: string) {
      const c = 'warehouse_list/' + whId;
      return this.db.doc(c).valueChanges();
    }

    addWarehouse(wh: Warehouse) {
      this.db.collection('warehouse_list').add(wh);
    }

    deleteWarehouse(whId: string) {
      const c = 'warehouse_list/' + whId;
      this.db.doc(c).delete();
    }

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

    editArea(areaId: string, area: Area) {
      const c = 'warehouse/' + areaId;
      this.db.doc(c).update(area);
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

    addProduct(product: Product) {
      return this.db.collection('products').add(product);
    }

    deleteProduct(pId: string) {
      const c = 'products/' + pId;
      this.db.doc(c).delete();
    }

    editProduct(pId: string, product: Product) {
      console.log(product);
      const c = 'products/' + pId;
      return this.db.doc(c).update(product);
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

    editPartner(pId: string, partner: Partner) {
      const c = 'partners/' + pId;
      this.db.doc(c).update(partner);
    }

    addPartner(partner) {
      this.db.collection('partners').add(partner);
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

    addWorker(worker: Worker) {
      this.db.collection('workers').doc(worker.wID).set(worker);
    }

    // Bevetelezes

    getReceipts() {
      return this.db.collection('buy').valueChanges({idField: 'bID'});
    }

    getReceipt(rID: string) {
      const c = 'receipts/' + rID;
      return this.db.doc(c).valueChanges();
    }

    addReceipt(b: Buy) {
      this.db.collection('buy').add(b);
    }

    // Eladasok

    getSells() {
      return this.db.collection('sell').valueChanges({idField: 'sID'});
    }

    addSell(sell) {
      this.db.collection('sell').add(sell);
    }

    // Statisztika

    getBuyes() {
      return this.db.collection('buy').valueChanges({idField: 'bID'});
    }

    getSellStat() {
      return this.db.collection('sell').valueChanges({idField: 'sID'});
    }
}
