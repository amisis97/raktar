import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/Product';
import { MatTableDataSource, MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator } from '@angular/material';
import { Database } from 'src/app/database.service';
import { Area } from 'src/app/interfaces/Area';
import { Partner } from 'src/app/interfaces/Partner';
import { firestore } from 'firebase';
import { Buy } from 'src/app/interfaces/Buy';
import { Warehouse } from 'src/app/interfaces/Warehouse';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  title = 'Termékkel kapcsolatos beállítások';
  public whForm: FormGroup;
  displayedColumns: string[] = ['name', 'area', 'productNr', 'stock', 'unit', 'purchasePrice', 'price', 'supplier', 'details', 'delete'];
  elements: Product[] = [];
  dataSource = new MatTableDataSource(this.elements);
  selectedElement = null;
  selectedSupplier: string;
  selectedArea: string;
  suppliers: Partner[] = [];
  areas: Area[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

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
          this.db.getWarehouse(temp.name).subscribe(wh => {
            const whTemp = wh as Warehouse;
            e.area = whTemp.name + ' ('  + temp.shelf + ')';
          });
        });
        this.db.getPartner(suppKey).subscribe(partner => {
          const temp = partner as Partner;
          e.supplier = temp.name;
        });
      });
      this.dataSource = new MatTableDataSource(this.elements);
      this.dataSource.paginator = this.paginator;
    });
    this.db.getPartners().subscribe(partners => {
      this.suppliers = partners as Partner[];
      this.suppliers = this.suppliers.filter(supplier => supplier.suppliers);
      this.selectedSupplier = this.suppliers[0].pID;
    });
    this.db.getAreas().subscribe(areas => {
      this.areas = areas as Area[];
      this.areas.forEach(area => {
        this.db.getWarehouse(area.name).subscribe(wh => {
          const tempWh = wh as Warehouse;
          area.name = tempWh.name;
        });
      });
      this.selectedArea = this.areas[0].areaId;
    });


    this.whForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      area: new FormControl('', [Validators.required]),
      productNr: new FormControl('', [Validators.required, Validators.minLength(2)]),
      stock: new FormControl('', [Validators.required, Validators.minLength(1)]),
      unit: new FormControl('', [Validators.required, Validators.minLength(1)]),
      purchasePrice: new FormControl('', [Validators.required, Validators.minLength(1)]),
      price: new FormControl('', [Validators.required, Validators.minLength(1)]),
      supplier: new FormControl('', [Validators.required]),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(element: Product): void {
    const dialogRef = this.dialog.open(ProductDialogDetails, {
      width: '450px',
      data: element
    });
  }

  deleteProduct(productId: string) {
    this.db.deleteProduct(productId);
    this.snackBar.open('Sikeres törlés!', null, {
      duration: 2000,
    });
  }

  hasError = (controlName: string, errorName: string) => {
    return this.whForm.controls[controlName].hasError(errorName);
  }

  createProduct = (whFormValue: Product) => {
    this.db.addProduct(whFormValue).then(docRef => {
      const buy = {
        date: firestore.Timestamp.now(),
        productId: docRef.id,
        stock: whFormValue.stock,
        sellerId: whFormValue.supplier
      };
      this.db.addReceipt(buy as Buy);
      this.whForm.reset();
    });
  }
}


@Component({
  selector: 'dialog-details',
  templateUrl: './dialog-details.html',
  styleUrls: ['./dialog-details.scss']
})

export class ProductDialogDetails {

  constructor(
    public dialogRef: MatDialogRef<ProductDialogDetails>,
    private db: Database,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Product) { }

  public productEditForm: FormGroup;
  countries: string[] = [];
  selectedSupplier: string;
  selectedArea: string;
  suppliers: Partner[] = [];
  areas: Area[] = [];

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.db.getPartners().subscribe(partners => {
      this.suppliers = partners as Partner[];
      this.suppliers = this.suppliers.filter(supplier => supplier.suppliers);
      this.selectedSupplier = this.suppliers[0].pID;
    });
    this.db.getAreas().subscribe(areas => {
      this.areas = areas as Area[];
      this.selectedArea = this.areas[0].areaId;
    });



    this.productEditForm = new FormGroup({
      pID: new FormControl(this.data.pID),
      name: new FormControl(this.data.name, [Validators.required, Validators.minLength(1)]),
      productNr: new FormControl(this.data.productNr, [Validators.required, Validators.minLength(2)]),
      unit: new FormControl(this.data.unit, [Validators.required, Validators.minLength(1)]),
      purchasePrice: new FormControl(this.data.purchasePrice, [Validators.required, Validators.minLength(1)]),
      price: new FormControl(this.data.price, [Validators.required, Validators.minLength(1)]),
    });

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.productEditForm.controls[controlName].hasError(errorName);
  }

  public editProduct = (productFormValue: any) => {
    this.db.editProduct(this.data.pID, productFormValue);
    this.dialogRef.close();
    this.snackBar.open('Sikeres módosítás!', null, {
      duration: 2000,
    });
  }
}

