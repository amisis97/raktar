import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellStatComponent } from './sell-stat.component';

describe('SellStatComponent', () => {
  let component: SellStatComponent;
  let fixture: ComponentFixture<SellStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
