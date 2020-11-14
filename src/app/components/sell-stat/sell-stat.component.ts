import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/Product';
import { MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { Database } from 'src/app/database.service';
import { Sell } from 'src/app/interfaces/Sell';
import { toDateString } from 'src/app/app.component';

@Component({
  selector: 'app-sell-stat',
  templateUrl: './sell-stat.component.html',
  styleUrls: ['./sell-stat.component.scss']
})
export class SellStatComponent implements OnInit {
  title = 'Értékesítés statisztika';
  toDate = new Date();
  fromDate = new Date();
  chartOptions = {
    responsive: true
  };
  chartData = [];
  chartLabels = [];
  selectedProductsId: string[] = [];
  products: Product[] = [];
  sells: Sell[] = [];

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
    this.db.getSells().subscribe(response => {
      this.sells = response as Sell[];
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
        const sell = this.sells.find((s) => {
            const tempDate = toDateString(s.date.toDate());
            return tempDate === date && s.products.find(p => p.productId === prod);
          });
        if (typeof(sell) !== 'undefined') {
          prodData.push(sell.products.find(p => p.productId === prod).count);
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
