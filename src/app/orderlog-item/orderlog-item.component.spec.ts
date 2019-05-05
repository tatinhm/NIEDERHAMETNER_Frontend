import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderlogItemComponent } from './orderlog-item.component';

describe('OrderlogItemComponent', () => {
  let component: OrderlogItemComponent;
  let fixture: ComponentFixture<OrderlogItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderlogItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderlogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
