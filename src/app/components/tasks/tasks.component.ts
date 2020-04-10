import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Database } from 'src/app/database.service';

export interface TaskElement {
  name: string;
  description: string;
  created: Date;
  deadline: Date;
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



  constructor(
    private db: Database,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.db.getTasks().subscribe(tasks => {
      console.log(tasks);
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

  public hasError = (controlName: string, errorName: string) =>{
    return this.taskForm.controls[controlName].hasError(errorName);
  }

  public createTask = (taskFormValue: any) => {
    taskFormValue.created = new Date();
    this.db.addTask(taskFormValue);
    this.taskForm.reset();
  }

  deleteTask(taskId) {
    this.selectedElement = null;
    this.db.deleteTask(taskId);
    this.snackBar.open('Sikeres törlés!', null, {
      duration: 2000,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectRow(element) {
    if (element === this.selectedElement) {
      this.selectedElement = null;
    } else {
      this.selectedElement = element;
    }
  }

}
