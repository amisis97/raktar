import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/Product';
import { MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { Database } from 'src/app/database.service';
import { Sell } from 'src/app/interfaces/Sell';
import { Buy } from 'src/app/interfaces/Buy';
import { Partner } from 'src/app/interfaces/Partner';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.scss']
})
export class ReceiptsComponent implements OnInit {

  title = 'Új bevételezés és termékbeszerzési előzmények';
  public whForm: FormGroup;
  displayedColumns: string[] = ['bID', 'date', 'product', 'seller', 'stock',  'allprice'];
  elements: Buy[] = [];
  dataSource = new MatTableDataSource(this.elements);
  sellers: Partner[];
  products: Product[];
  selectedElement = null;
  selectedPartner = null;
  selectedProduct = null;

  constructor(
    private db: Database,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.db.getReceipts().subscribe(receipts => {
      receipts.forEach(r => {
        const temp = r as Buy;
        this.db.getPartner(temp.sellerId).subscribe(s => {
          const tempS = s as Partner;
          temp.seller = tempS;
        });
        this.db.getProduct(temp.productId).subscribe(p => {
          const tempP = p as Product;
          temp.product = tempP;
        });
        this.elements.push(temp);
      });
      this.dataSource = new MatTableDataSource(this.elements);
    });

    this.db.getPartners().subscribe(partners => {
      this.sellers = partners as Partner[];
      this.sellers = this.sellers.filter(supplier => supplier.suppliers);
      this.selectedPartner = this.sellers[0].pID;
    });

    this.db.getProducts().subscribe(products => {
      this.products = products as Product[];
      this.selectedProduct = this.products[0];
    });

    this.whForm = new FormGroup({
      sellerId: new FormControl('', [Validators.required, Validators.minLength(2)]),
      productId: new FormControl('', [Validators.required, Validators.minLength(2)]),
      stock: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
  }

  changePartner(value) {
    this.db.getProducts().subscribe(products => {
      this.products = [];
      products.forEach(p => {
        const temp = p as Product;
        if (temp.supplier === value) {
          this.products.push(temp);
        }
      });
      console.log(this.products);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  hasError = (controlName: string, errorName: string) => {
    return this.whForm.controls[controlName].hasError(errorName);
  }

  createReceipt = (whFormValue) => {
    /*this.db.addReceipt(whFormValue);
    this.whForm.reset();*/
  }

}
