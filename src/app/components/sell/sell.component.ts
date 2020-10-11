import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { firestore } from 'firebase';
import { Database } from 'src/app/database.service';
import { Buy } from 'src/app/interfaces/Buy';
import { Partner } from 'src/app/interfaces/Partner';
import { Product } from 'src/app/interfaces/Product';
import { Sell } from 'src/app/interfaces/Sell';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {

  title = 'Vevői megrendelések és előzmények';
  public whForm: FormGroup;
  displayedColumns: string[] = ['sID', 'date', 'buyer', 'products', 'total'];
  elements: Sell[] = [];
  dataSource = new MatTableDataSource(this.elements);
  buyers: Partner[];
  products: Product[];
  selectedElement = null;
  selectedPartner = null;
  selectedProduct = null;
  selectedProductObj: Product;
  productsInput = new FormArray([new FormGroup({
    product: new FormControl('', [Validators.required]),
    count: new FormControl('', [Validators.required, Validators.minLength(1)])
  })]);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private db: Database,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.db.getSells().subscribe(sells => {
      this.elements = sells as Sell[];
      this.elements.forEach(r => {
        this.db.getPartner(r.buyer.trim()).subscribe(s => {
          const tempS = s as Partner;
          r.partner = tempS;
        });
        r.productsObj = [];
        r.total = 0;
        r.products.forEach(p => {
          this.db.getProduct(p.productId.trim()).subscribe(pro => {
            const tempPro = pro as Product;
            tempPro.stock = p.count;
            tempPro.price = p.price;
            r.total += p.count * p.price;
            r.productsObj.push(tempPro);
          });
        });
      });
      this.dataSource = new MatTableDataSource(this.elements);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.db.getPartners().subscribe(partners => {
      this.buyers = partners as Partner[];
      this.selectedPartner = this.buyers[0].pID;
    });

    this.db.getProducts().subscribe(products => {
      this.products = products as Product[];
      this.selectedProduct = this.products[0];
    });

    this.whForm = new FormGroup({
      buyerId: new FormControl('', [Validators.required, Validators.minLength(2)]),
      products: this.productsInput,
    });
  }

  /*changePartner(value) {
    this.db.getProducts().subscribe(products => {
      this.products = [];
      products.forEach(p => {
        const temp = p as Product;
        if (temp.supplier === value) {
          this.products.push(temp);
        }
      });
    });
  }*/

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

  addProduct(e) {
    e.preventDefault();
    this.productsInput.push(new FormGroup({
      product: new FormControl('', [Validators.required]),
      count: new FormControl('', [Validators.required, Validators.minLength(1)])
    }));
  }

  createSell = (whFormValue) => {
    console.log(whFormValue);
    /*let total = 0;
    let products = [];
    whFormValue.products.forEach(p => {
      total += p.price;
      products.push({
        product: p.pID
      });
    });
    const data = {
      buyer: whFormValue.buyerId,
      date: firestore.Timestamp.now(),
      products:
    };*/
    /*if (this.selectedProductObj) {
      const newTemp = this.selectedProductObj;
      newTemp.stock += whFormValue.stock;
      this.db.editProduct(this.selectedProduct, newTemp);
      this.db.addReceipt(whFormValue);
    }
    this.whForm.reset();
    this.snackBar.open('A termék bevételezve lett a raktárba!', null, {
      duration: 2000,
    });*/
  }

}
