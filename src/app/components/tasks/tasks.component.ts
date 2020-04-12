import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Database } from 'src/app/database.service';
import { firestore } from 'firebase';
import { sameDay } from '../../app.component';

export interface TaskElement {
  name: string;
  description: string;
  created: firestore.Timestamp;
  deadline: firestore.Timestamp;
  priority: boolean;
  done: boolean;
  taskId: string;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})

export class TasksComponent implements OnInit {
  public taskForm: FormGroup;
  displayedColumns: string[] = ['name', 'created', 'deadline', 'priority', 'done', 'details', 'delete'];
  elements: TaskElement[] = [
    /*{
      name: 'Task1',
      description: 'Ez egy nagyon fontos feladat',
      created: '2020-03-20',
      deadline: '2020-04-01',
      priority: true,
      done: false
    },
    {
      name: 'Task2',
      description: 'Ez egy másik feladat',
      created: '2020-02-21',
      deadline: '2020-03-01',
      priority: false,
      done: false
    },
    {
      name: 'Task3',
      description: 'Ez egy sokadik feladat',
      created: '2020-01-20',
      deadline: '2020-03-28',
      priority: false,
      done: true
    }*/
  ];
  title = 'Feladatok / Teendők / Jegyzetek lista';
  dataSource = new MatTableDataSource(this.elements);
  selectedElement = null;
  panelOpenState = false;



  constructor(
    private db: Database,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.db.getTasks().subscribe(tasks => {
      this.elements = tasks as TaskElement[];
      this.dataSource = new MatTableDataSource(this.elements);
    });

    this.taskForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      deadline: new FormControl(new Date()),
      description: new FormControl(''),
      priority: new FormControl(false)
    });
  }

  openDialog(element: TaskElement): void {
    const dialogRef = this.dialog.open(DialogDetails, {
      width: '450px',
      data: element
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.taskForm.controls[controlName].hasError(errorName);
  }

  public createTask = (taskFormValue: any) => {
    taskFormValue.created = new Date();
    this.db.addTask(taskFormValue);
    this.taskForm.reset();
  }

  deleteTask(taskId: string) {
    this.selectedElement = null;
    this.db.deleteTask(taskId);
    this.snackBar.open('Sikeres törlés!', null, {
      duration: 2000,
    });
  }

  doneTask(element: TaskElement, check: boolean) {
    element.done = check;
    this.db.editTask(element.taskId, element);
    this.snackBar.open('Sikeres módosítás!', null, {
      duration: 2000,
    });
  }

  priorityTask(element: TaskElement, check: boolean) {
    element.priority = check;
    this.db.editTask(element.taskId, element);
    this.snackBar.open('Sikeres módosítás!', null, {
      duration: 2000,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectRow(element: TaskElement) {
    this.panelOpenState = false;
    if (element === this.selectedElement) {
      this.selectedElement = null;
    } else {
      this.selectedElement = element;
    }
  }

  isExpired(element: TaskElement) {
    const d1 = element.deadline.toDate();
    const d2 = new Date();
    return d1 < d2 && !sameDay(d1, d2);
  }

}

@Component({
  selector: 'dialog-details',
  templateUrl: './dialog-details.html',
  styleUrls: ['./dialog-details.scss']
})

export class DialogDetails {

  public taskEditForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogDetails>,
    private db: Database,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: TaskElement) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.taskEditForm = new FormGroup({
      name: new FormControl(this.data.name, [Validators.required, Validators.maxLength(60)]),
      deadline: new FormControl(this.data.deadline.toDate(), [Validators.required]),
      description: new FormControl(this.data.description),
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.taskEditForm.controls[controlName].hasError(errorName);
  }

  public editTask = (taskFormValue: any) => {
    const overWriteValues = {...this.data, ...taskFormValue};
    this.db.editTask(this.data.taskId, overWriteValues);
    this.dialogRef.close();
    this.snackBar.open('Sikeres módosítás!', null, {
      duration: 2000,
    });
  }

}
