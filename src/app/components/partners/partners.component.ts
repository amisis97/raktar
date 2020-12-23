import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Partner } from 'src/app/interfaces/Partner';
import { MatTableDataSource, MatSnackBar, MatDialog, MatSelect, MatDialogRef, MAT_DIALOG_DATA, MatPaginator } from '@angular/material';
import { Database } from 'src/app/database.service';
import countriesData from './countries.json';
import { Product } from 'src/app/interfaces/Product';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss', '../warehouse/warehouse.component.scss']
})
export class PartnersComponent implements OnInit {

  title = 'Vásárlók és beszállítók adatai';
  public whForm: FormGroup;
  displayedColumns: string[] = ['name', 'country', 'address', 'customer', 'suppliers', 'details', 'delete'];
  elements: Partner[] = [];
  dataSource = new MatTableDataSource(this.elements);
  selectedElement = null;
  selectedCountry = null;
  countries: string[] = [];
  onlySup = false;
  onlyCust = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private db: Database,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.db.getPartners().subscribe(partners => {
      this.elements = partners as Partner[];
      this.dataSource = new MatTableDataSource(this.elements);
      this.dataSource.paginator = this.paginator;
    });
    Object.entries(countriesData).forEach((country) => {
      this.countries.push(`${country[1]} (${country[0]})`);
    });
    this.selectedCountry = this.countries[0];
    this.filterType();


    this.whForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      country: new FormControl('', [Validators.required]),
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

  openDialog(element: Partner): void {
    const dialogRef = this.dialog.open(PartnerDialogDetails, {
      width: '450px',
      data: element
    });
  }

  selectRow(element: Partner) {
    if (element === this.selectedElement) {
      this.selectedElement = null;
    } else {
      this.selectedElement = element;
    }
  }

  deletePartner(partner: Partner) {
    let error = false;
    this.db.getProducts().subscribe(products => {
      products = products as Product[];
      products.forEach(p => {
        const temp = p as Product;
        if (temp.supplier === partner.pID) {

          error = true;
        }
      });
      if (!error) {
        this.db.deletePartner(partner.pID);
        this.snackBar.open('Sikeres törlés!', null, {
          duration: 2000,
        });
      } else {
        this.snackBar.open('Törlés sikertelen, előbb törölni kell a partnerhez tartozó termékeket!', null, {
          duration: 4000,
        });
      }
    });
  }

  editPartner(partner: Partner) {
    this.db.editPartner(partner.pID, partner);
    this.snackBar.open('Sikeres módosítás!', null, {
      duration: 2000,
    });
  }

  hasError = (controlName: string, errorName: string) => {
    return this.whForm.controls[controlName].hasError(errorName);
  }

  createPartner = (whFormValue) => {
    if (!whFormValue.suppliers) {
      whFormValue.suppliers = false;
    }
    if (!whFormValue.customer) {
      whFormValue.customer = false;
    }
    this.db.addPartner(whFormValue);
    this.whForm.reset();
  }

  filterType() {
    this.dataSource = new MatTableDataSource(this.elements.filter(e => {
      if(this.onlySup && !e.suppliers || this.onlyCust && !e.customer) {
        return false;
      }
      return true;
    }));
    this.dataSource.paginator = this.paginator;
  }

  onlyCustomer() {
    if(this.onlyCust) {
      this.dataSource = new MatTableDataSource(this.elements.filter(e => e.customer));
    } else {
      this.dataSource = new MatTableDataSource(this.elements);
    }
    this.dataSource.paginator = this.paginator;
  }

}


@Component({
  selector: 'dialog-details',
  templateUrl: './dialog-details.html',
  styleUrls: ['./dialog-details.scss']
})

export class PartnerDialogDetails {

  constructor(
    public dialogRef: MatDialogRef<PartnerDialogDetails>,
    private db: Database,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Partner) { }

  public partnerEditForm: FormGroup;
  countries: string[] = [];

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    Object.entries(countriesData).forEach((country) => {
      this.countries.push(`${country[1]} (${country[0]})`);
    });
    this.partnerEditForm = new FormGroup({
      name: new FormControl(this.data.name, [Validators.required, Validators.minLength(2)]),
      country: new FormControl(this.data.country, [Validators.required]),
      city: new FormControl(this.data.city, [Validators.required, Validators.minLength(2)]),
      address: new FormControl(this.data.address, [Validators.required, Validators.minLength(2)]),
    });

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.partnerEditForm.controls[controlName].hasError(errorName);
  }

  public editPartner = (partnerFormValue: any) => {
    const overWriteValues = { ...this.data, ...partnerFormValue };
    this.db.editPartner(this.data.pID, overWriteValues);
    this.dialogRef.close();
    this.snackBar.open('Sikeres módosítás!', null, {
      duration: 2000,
    });
  }
}
