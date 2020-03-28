import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Database } from 'src/app/database.service';

export interface TaskElement {
  name: string;
  description: string;
  created: Date;
  deadline: Date;
  priority: boolean;
  done: boolean;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})

export class TasksComponent implements OnInit {
  displayedColumns: string[] = ['name', 'created', 'deadline', 'priority', 'done', 'delete'];
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
  date = new FormControl(new Date());



  constructor(
    private db: Database,
  ) {
  }

  ngOnInit() {
    console.log(this.date.value);
    this.db.getTasks().subscribe(tasks => {
      this.elements = tasks as TaskElement[];
      this.elements.forEach(elem => {
        elem.created = new Date(elem.created.seconds * 1000);
        elem.deadline = new Date(elem.deadline.seconds * 1000);
      });
      this.dataSource = new MatTableDataSource(this.elements);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectRow(element) {
    if (JSON.stringify(element) === JSON.stringify(this.selectedElement) ) {
      this.selectedElement = null;
    } else {
      this.selectedElement = element;
    }
  }

}
