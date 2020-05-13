import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptsPageComponent } from './receipts-page.component';

describe('ReceiptsPageComponent', () => {
  let component: ReceiptsPageComponent;
  let fixture: ComponentFixture<ReceiptsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
