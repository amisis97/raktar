import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Sell } from 'src/app/interfaces/Sell';
import { MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { Database } from 'src/app/database.service';
import { Product } from 'src/app/interfaces/Product';
import { Buy } from 'src/app/interfaces/Buy';
import firebase from 'firebase';
import { toDateString } from 'src/app/app.component';

@Component({
  selector: 'app-buy-stat',
  templateUrl: './buy-stat.component.html',
  styleUrls: ['./buy-stat.component.scss']
})

export class BuyStatComponent implements OnInit {

  title = 'Bevételezés statisztika';
  toDate = new Date();
  fromDate = new Date();
  chartOptions = {
    responsive: true
  };
  chartData = [];
  chartLabels = [];
  selectedProductsId: string[] = [];
  products: Product[] = [];
  buyes: Buy[] = [];

  constructor(
    private db: Database,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.fromDate.setMonth(this.toDate.getMonth() - 1);
    this.changeChartLabel();
    this.db.getProducts().subscribe(response => {
      this.products = response as Product[];
    });
    this.db.getBuyes().subscribe(response => {
      this.buyes = response as Buy[];
    });
  }

  getDaysArray = (start: Date, end: Date) => {
    const arr = [];
    for (const dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
        arr.push(toDateString(new Date(dt)));
    }
    return arr;
  }


  reRenderChart() {
    this.chartData = [];
    this.selectedProductsId.forEach(prod => {
      const prodData = [];
      this.chartLabels.forEach(date => {
        const buy = this.buyes.find((b) => {
            const tempDate = b.date ? toDateString(b.date.toDate()) : null;
            return tempDate === date && prod === b.productId;
          });
        if (typeof(buy) !== 'undefined') {
          prodData.push(buy.stock);
        } else {
          prodData.push(0);
        }
      });
      const tempProd = this.products.find(p => p.pID === prod);
      if (tempProd) {
        this.chartData.push({
          label: `${tempProd.name} (${tempProd.productNr})`,
          data: prodData
        });
      }
    });
  }

  changeProduct(value) {
    this.selectedProductsId = value;
    this.reRenderChart();
  }

  changeChartLabel() {
    this.chartLabels = this.getDaysArray(this.fromDate, this.toDate);
    this.reRenderChart();
  }

}
