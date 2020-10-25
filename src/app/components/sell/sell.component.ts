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

  removeProduct(e, index) {
    e.preventDefault();
    this.productsInput.removeAt(index);
  }

  createSell = (whFormValue) => {
    const prods = [];
    for (const prod of whFormValue.products) {
      const tempProd = this.products.find(p => p.pID === prod.product);
      tempProd.stock -= prod.count;
      if (tempProd.stock < 0) {
        this.snackBar.open(`Nincs készleten az alábbi termék: ${tempProd.name} (${tempProd.productNr})`, null, {
          duration: 2000,
        });
        return;
      }
      this.db.editProduct(prod.product, tempProd);
      const totalProdPrice = tempProd.price * prod.count;
      prods.push({
        count: prod.count,
        price: totalProdPrice,
        productId: prod.product,
      });
    }
    const data = {
      buyer: whFormValue.buyerId,
      date: firestore.Timestamp.now(),
      products: prods
    };
    this.whForm.reset();
    this.db.addSell(data);
    this.snackBar.open('A termék sikeresen eladva!', null, {
      duration: 2000,
    });
  }

}
