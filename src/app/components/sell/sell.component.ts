import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { firestore } from 'firebase';
import { Database } from 'src/app/database.service';
import { Buy } from 'src/app/interfaces/Buy';
import { Partner } from 'src/app/interfaces/Partner';
import { Product } from 'src/app/interfaces/Product';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {

  title = 'Vevői megrendelések és előzmények';
  public whForm: FormGroup;
  displayedColumns: string[] = ['bID', 'date', 'product', 'seller', 'stock',  'allprice'];
  elements: Buy[] = [];
  dataSource = new MatTableDataSource(this.elements);
  sellers: Partner[];
  products: Product[];
  selectedElement = null;
  selectedPartner = null;
  selectedProduct = null;
  selectedProductObj: Product;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private db: Database,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.db.getReceipts().subscribe(receipts => {
      this.elements = receipts as Buy[];
      this.elements.forEach(r => {
        this.db.getPartner(r.sellerId).subscribe(s => {
          const tempS = s as Partner;
          r.seller = tempS;
        });
        this.db.getProduct(r.productId).subscribe(p => {
          const tempP = p as Product;
          r.product = tempP;
        });
      });
      this.dataSource = new MatTableDataSource(this.elements);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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
      stock: new FormControl('', [Validators.required, Validators.minLength(2), Validators.min(1)]),
      date: new FormControl(firestore.Timestamp.now())
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
    });
  }

  changeProduct(value) {
    this.db.getProduct(value).subscribe(product => {
      const temp = product as Product;
      this.selectedProductObj = temp;
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
    if (this.selectedProductObj) {
      const newTemp = this.selectedProductObj;
      newTemp.stock += whFormValue.stock;
      this.db.editProduct(this.selectedProduct, newTemp);
      this.db.addReceipt(whFormValue);
    }
    this.whForm.reset();
    this.snackBar.open('A termék bevételezve lett a raktárba!', null, {
      duration: 2000,
    });
  }

}
