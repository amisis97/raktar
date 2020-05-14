import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Partner } from 'src/app/interfaces/Partner';
import { MatTableDataSource, MatSnackBar, MatDialog, MatSelect } from '@angular/material';
import { Database } from 'src/app/database.service';
import countriesData from './countries.json';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss', '../warehouse/warehouse.component.scss']
})
export class PartnersComponent implements OnInit {

  title = 'Vásárlók és beszállítók adatai';
  public whForm: FormGroup;
  displayedColumns: string[] = ['name', 'country', 'address', 'customer', 'suppliers'];
  elements: Partner[] = [];
  dataSource = new MatTableDataSource(this.elements);
  selectedElement = null;
  selectedCountry = null;
  countries: string[] = [];

  constructor(
    private db: Database,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.db.getPartners().subscribe(partners => {
      this.elements = partners as Partner[];
      this.dataSource = new MatTableDataSource(this.elements);
    });
    Object.entries(countriesData).forEach((country) => {
      this.countries.push(`${country[1]} (${country[0]})`);
    });
    this.selectedCountry = this.countries[0];


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
    console.log('not work');
  }

  deletePartner(partnerId: string) {
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

  editPartner(partnerId: string) {

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

}
