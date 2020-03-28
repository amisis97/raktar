import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'created', 'deadline', 'priority', 'done'];
  elements = [
    {
      id: 1,
      name: 'Task1',
      description: 'Ez egy nagyon fontos feladat',
      created: '2020-03-20',
      deadline: '2020-04-01',
      priority: true,
      done: false
    },
    {
      id: 2,
      name: 'Task2',
      description: 'Ez egy másik feladat',
      created: '2020-02-21',
      deadline: '2020-03-01',
      priority: false,
      done: false
    },
    {
      id: 3,
      name: 'Task3',
      description: 'Ez egy sokadik feladat',
      created: '2020-01-20',
      deadline: '2020-03-28',
      priority: false,
      done: true
    }
  ];
  title = 'Feladatok / Teendők / Jegyzetek lista';
  dataSource = new MatTableDataSource(this.elements);
  selectedElement = this.elements[0];



  constructor() {
  }

  ngOnInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectRow(element) {
    this.selectedElement = element;
  }

}
