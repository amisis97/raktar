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
  public newWhForm: FormGroup;
  displayedColumns: string[] = ['name', 'row', 'column', 'shelf', 'details', 'delete'];
  elements: Area[] = [];
  dataSource = new MatTableDataSource(this.elements);
  selectedWh: string = null;
  warehouseList: Warehouse[] = [];

  constructor(
    private db: Database,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.db.getAreas().subscribe(areas => {
      this.elements = areas as Area[];
      this.elements.forEach(e => {
        const whId = e.name;
        this.db.getWarehouse(whId).subscribe(wh => {
          const temp = wh as Warehouse;
          e.name = temp.name;
        });
      });
      this.dataSource = new MatTableDataSource(this.elements);
    });

    this.db.getWarehouses().subscribe(wh => {
      this.warehouseList = wh as Warehouse[];
      this.selectedWh = this.warehouseList[0].whId;
    });


    this.whForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      row: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      column: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      shelf: new FormControl('', [Validators.required, Validators.maxLength(10)])
    });

    this.newWhForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(areaId: string): void {
    this.db.getArea(areaId).subscribe(area => {
      const tempArea = area as Area;
      tempArea.areaId = areaId;
      this.dialog.open(WarehouseDialogDetails, {
        width: '450px',
        data: tempArea
      });
    });
  }

  deleteArea(areaId: string) {
    this.db.getProducts().subscribe(products => {
      let error = false;
      products.forEach(p => {
        const temp = p as Product;
        if (temp.area === areaId) {
          error = true;
        }
      });
      if (error) {
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

  hasError(controlName: string, errorName: string) {
    return this.whForm.controls[controlName].hasError(errorName);
  }

  editArea(areaId: string) {

  }

  createArea(whFormValue: Area) {
    this.db.addArea(whFormValue);
    this.whForm.reset();
  }

  deleteWh(whId) {
    this.db.getAreas().subscribe(areas => {
      let error = false;
      areas.forEach(a => {
        const temp = a as Area;
        if (temp.name === whId) {
          error = true;
        }
      });
      if (error) {
        this.snackBar.open('Törlés sikertelen, előbb törölni kell a polchelyeket!', null, {
          duration: 4000,
        });
      } else {
        this.db.deleteWarehouse(whId);
        this.snackBar.open('Sikeres törlés!', null, {
          duration: 2000,
        });
      }
    });

  }

  addWh(newWhFormValue: Warehouse) {
    this.db.addWarehouse(newWhFormValue);
    this.newWhForm.reset();
  }

}


@Component({
  selector: 'dialog-details',
  templateUrl: './dialog-details.html',
  styleUrls: ['./dialog-details.scss']
})

export class WarehouseDialogDetails {

  public warehouseEditForm: FormGroup;
  warehouseList: Warehouse[] = [];
  selectedWh: string = null;

  constructor(
    public dialogRef: MatDialogRef<WarehouseDialogDetails>,
    private db: Database,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Area) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.data);
    this.db.getWarehouses().subscribe(wh => {
      this.warehouseList = wh as Warehouse[];
      this.selectedWh = this.warehouseList[0].whId;
    });
    this.warehouseEditForm = new FormGroup({
      name: new FormControl(this.data.name, [Validators.required]),
      row: new FormControl(this.data.row, [Validators.required, Validators.maxLength(5)]),
      column: new FormControl(this.data.column, [Validators.required, Validators.maxLength(5)]),
      shelf: new FormControl(this.data.shelf, [Validators.required, Validators.maxLength(10)])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
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
