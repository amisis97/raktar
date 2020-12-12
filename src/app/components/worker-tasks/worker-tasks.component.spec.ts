import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerTasksComponent } from './worker-tasks.component';

describe('WorkerTasksComponent', () => {
  let component: WorkerTasksComponent;
  let fixture: ComponentFixture<WorkerTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
