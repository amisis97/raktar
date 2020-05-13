import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/Product';
import { MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { Database } from 'src/app/database.service';
import { Area } from 'src/app/interfaces/Area';
import { Partner } from 'src/app/interfaces/Partner';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.scss']
})
export class ReceiptsComponent implements OnInit {

  title = 'Vásárlók és beszállítók adatai';
  public whForm: FormGroup;
  displayedColumns: string[] = ['name', 'area', 'productNr', 'stock', 'unit', 'purchasePrice', 'price', 'supplier'];
  elements: Product[] = [];
  dataSource = new MatTableDataSource(this.elements);
  selectedElement = null;

  constructor(
    private db: Database,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.db.getProducts().subscribe(products => {
      this.elements = products as Product[];
      this.elements.forEach(e => {
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
      });
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

  openDialog(element: Product): void {
    console.log('not work');
  }

  deleteProduct(productId: string) {
    this.db.getProducts().subscribe(products => {
      // let p = products.find(obj  => obj.partner === partnerId);
      // Tipus hiba van
      let p = null;
      if(p) {
        this.snackBar.open('Törlés sikertelen, előbb törölni kell a termékeket!', null, {
          duration: 4000,
        });
      } else {
        this.snackBar.open('Sikeres törlés!', null, {
          duration: 2000,
        });
      }
    });
  }

  hasError = (controlName: string, errorName: string) => {
    return this.whForm.controls[controlName].hasError(errorName);
  }

  editProduct(productId: string) {

  }

  createProduct = (whFormValue) => {
    this.db.addArea(whFormValue);
    this.whForm.reset();
  }

}
