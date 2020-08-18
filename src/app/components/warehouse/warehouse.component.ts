import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Database } from 'src/app/database.service';
import { Area } from 'src/app/interfaces/Area';
import { Product } from 'src/app/interfaces/Product';
import { TaskElement } from 'src/app/interfaces/TaskElement';
import { Warehouse } from 'src/app/interfaces/Warehouse';

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
  warehouseList: Warehouse[] = [];

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

    this.db.getWarehouses().subscribe(wh => {
      this.warehouseList = wh as Warehouse[];
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
    const dialogRef = this.dialog.open(WarehouseDialogDetails, {
      width: '450px',
      data: element
    });
  }

  deleteTask(areaId: string) {
    this.db.getProducts().subscribe(products => {
      let error = false;
      products.forEach(p => {
        const temp = p as Product;
        if(temp.area === areaId) {
          error = true;
        }
      });
      if(error) {
        this.snackBar.open('Törlés sikertelen, előbb törölni kell a termékeket!', null, {
          duration: 4000,
        });
      } else {
        this.db.deleteArea(areaId);
        this.snackBar.open('Sikeres törlés!', null, {
          duration: 2000,
        });
      }
    });
  }

  hasError = (controlName: string, errorName: string) => {
    return this.whForm.controls[controlName].hasError(errorName);
  }

  editArea(areaId: string) {

  }

  createTask = (whFormValue: Area) => {
    this.db.addArea(whFormValue);
    this.whForm.reset();
  }

}


@Component({
  selector: 'dialog-details',
  templateUrl: './dialog-details.html',
  styleUrls: ['./dialog-details.scss']
})

export class WarehouseDialogDetails {

  public warehouseEditForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<WarehouseDialogDetails>,
    private db: Database,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Area) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.warehouseEditForm = new FormGroup({
      name: new FormControl(this.data.name, [Validators.required, Validators.maxLength(10)]),
      row: new FormControl(this.data.row, [Validators.required, Validators.maxLength(5)]),
      column: new FormControl(this.data.column, [Validators.required, Validators.maxLength(5)]),
      shelf: new FormControl(this.data.shelf, [Validators.required, Validators.maxLength(10)])
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.warehouseEditForm.controls[controlName].hasError(errorName);
  }

  public editWarehouse = (warehouseFormValue: any) => {
    this.db.editArea(this.data.areaId, warehouseFormValue);
    this.onNoClick();
    this.snackBar.open('Sikeres módosítás!', null, {
      duration: 2000,
    });
  }

}
