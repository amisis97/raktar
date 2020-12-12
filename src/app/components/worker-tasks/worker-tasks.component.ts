import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';
import { Database } from 'src/app/database.service';
import { Area } from 'src/app/interfaces/Area';
import { Product } from 'src/app/interfaces/Product';
import { WorkerList } from 'src/app/interfaces/WorkerList';

@Component({
  selector: 'app-worker-tasks',
  templateUrl: './worker-tasks.component.html',
  styleUrls: ['./worker-tasks.component.scss']
})
export class WorkerTasksComponent implements OnInit {

  title = 'Saját kiszedési listák';
  workerLists: WorkerList[] = [];
  areaList: Area[];
  workerId: string;
  products: Product[];
  selectWorkList: WorkerList;
  completedLists: WorkerList[] = [];

  constructor(
    private db: Database,
    private snackBar: MatSnackBar,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.workerId = this.auth.getUserId;
    this.db.getProducts().subscribe(products => {
      this.products = products as Product[];
    });
    this.db.getAreas().subscribe(a => this.areaList = a as Area[]);
    this.db.getWorkerListByWorkerId(this.workerId).subscribe(resp => {
      const tempWl = resp as WorkerList[];
      this.workerLists = [];
      this.completedLists = [];
      tempWl.forEach(wl => {
        wl.products.forEach(p => {
          p.productObj = this.products.find(pro => pro.pID === p.product);
          if(p.productObj && this.areaList.find(a => a.areaId === p.productObj.area)) {
            const tempArea = this.areaList.find(a => a.areaId === p.productObj.area);
            p.productObj.area = tempArea.column + '|' + tempArea.row + '|' + tempArea.shelf;
          }
        });
        if(wl.products.every(p => p.ready)) {
          this.completedLists.push(wl);
        } else {
          this.workerLists.push(wl);
        }
      });
    });
  }

  changeWorkListSelected(wList) {
    this.selectWorkList = wList;
  }

  changeWorkList(event) {
    const tempProducts = this.selectWorkList.products;
    tempProducts.forEach(p => {
      if (p.product === event.option.value) {
        p.ready = event.option.selected;
      }
    });
    tempProducts.map(p => delete p.productObj);
    const data = {
      wID: this.selectWorkList.wID,
      products: this.selectWorkList.products
    };
    this.db.editWorkerListByWorkerListId(this.selectWorkList.wlID, data);
    this.snackBar.open('Sikeres frissítés!', null, {
      duration: 2000,
    });
  }

}
