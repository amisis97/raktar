import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { Database } from 'src/app/database.service';
import { Product } from 'src/app/interfaces/Product';
import { User } from 'src/app/interfaces/User';
import { Worker } from 'src/app/interfaces/Worker';
import firebase from 'firebase';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {

  title = 'Raktárosok és feladat kiadása';
  public whForm: FormGroup;
  displayedColumns: string[] = ['name', 'address', 'email', 'details', 'delete'];
  elements: Worker[] = [];
  dataSource = new MatTableDataSource(this.elements);
  selectedElement = null;
  addProducts = [];
  products: Product[];
  selectedProduct = null;

  constructor(
    private db: Database,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.db.getWorkers().subscribe(workers => {
      this.elements = workers as unknown as Worker[];
      this.dataSource = new MatTableDataSource(this.elements);
    });

    this.whForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      email: new FormControl('', [Validators.required, Validators.minLength(3)])
    });

    this.db.getProducts().subscribe(products => {
      this.products = products as Product[];
      this.selectedProduct = this.products[0];
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(element: Worker): void {
    console.log('not work');
  }

  deleteWorker(workerId: string) {
    this.db.getWorkers().subscribe(products => {
      // let p = products.find(obj  => obj.warokers === workerId);
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

  editWorker(workerId: string) {

  }

  createWorker = (whFormValue: Worker) => {
    // this.db.addWorker(whFormValue);
    firebase.auth().createUserWithEmailAndPassword(whFormValue.email, whFormValue.password).then(resp => {
      const tempWorker = whFormValue;
      const tempUser = {
        id: resp.user.uid,
        displayName: whFormValue.name,
        img: '',
        role: 'worker'
      };
      tempWorker.wID = resp.user.uid;
      this.db.addWorker(tempWorker);
      this.db.addUser(tempUser);
      this.snackBar.open('Sikeres hozzáadás!', null, {
        duration: 2000,
      });
      this.whForm.reset();
    });
  }

  createList = (whFormValue) => {
    console.log(whFormValue);
  }

  addNewProductRow(e) {
    e.preventDefault();
    console.log("work");
    this.addProducts.push('product' + this.addProducts.length);
  }

}
