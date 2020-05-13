import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyStatComponent } from './buy-stat.component';

describe('BuyStatComponent', () => {
  let component: BuyStatComponent;
  let fixture: ComponentFixture<BuyStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
