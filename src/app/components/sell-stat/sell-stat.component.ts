import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/Product';
import { MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { Database } from 'src/app/database.service';
import { Sell } from 'src/app/interfaces/Sell';

@Component({
  selector: 'app-sell-stat',
  templateUrl: './sell-stat.component.html',
  styleUrls: ['./sell-stat.component.scss']
})
export class SellStatComponent implements OnInit {

  title = 'Vásárlók és beszállítók adatai';
  public whForm: FormGroup;
  displayedColumns: string[] = ['name', 'area', 'productNr', 'stock', 'unit', 'purchasePrice', 'price', 'supplier'];
  elements: Sell[] = [];
  dataSource = new MatTableDataSource(this.elements);
  selectedElement = null;

  constructor(
    private db: Database,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.db.getReceipts().subscribe(products => {
      //this.elements = products as Sell[];
      /*this.elements.forEach(e => {
        const areaKey = e.area;
        const suppKey = e.supplier;
        e.area = null;
        e.supplier = null;
        this.db.getArea(areaKey).subscribe(area => {
          const temp = area as Area;
          e.area = temp.name;
        });
        this.db.getPartner(suppKey).subscribe(partner => {
          const temp = partner as Partner;
          e.supplier = temp.name;
        });
      });*/
      this.dataSource = new MatTableDataSource(this.elements);
    });

    this.whForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      country: new FormControl('', [Validators.required, Validators.minLength(2)]),
      city: new FormControl('', [Validators.required, Validators.minLength(2)]),
      address: new FormControl('', [Validators.required, Validators.minLength(2)]),
      customer: new FormControl(''),
      suppliers: new FormControl('')
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(element: Sell): void {
    console.log('not work');
  }

  hasError = (controlName: string, errorName: string) => {
    return this.whForm.controls[controlName].hasError(errorName);
  }

  getDiagramFromReceipts(receipts: Sell[]) {

  }

  getAllData() {

  }

}
