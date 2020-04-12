import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { Database } from 'src/app/database.service';
import { Area } from 'src/app/interfaces/Area';
import { Product } from 'src/app/interfaces/Product';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {

  title = 'Raktárral kapcsolatos beállítások';
  public whForm: FormGroup;
  displayedColumns: string[] = ['name', 'row', 'column', 'shelf', 'details', 'delete'];
  elements: Area[] = [];
  dataSource = new MatTableDataSource(this.elements);
  selectedElement = null;

  constructor(
    private db: Database,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.db.getAreas().subscribe(areas => {
      this.elements = areas as Area[];
      this.dataSource = new MatTableDataSource(this.elements);
    });

    this.whForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      row: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      column: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      shelf: new FormControl('', [Validators.required, Validators.maxLength(10)])
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(element: Area): void {
    console.log('not work');
  }

  deleteTask(areaId: string) {
    this.db.getProducts().subscribe(products => {
      let p = products.find(obj  => obj.area === areaId);
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

  createTask = (whFormValue) => {
    this.db.addArea(whFormValue);
    this.whForm.reset();
  }

}
