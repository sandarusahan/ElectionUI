import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDivisionsComponent } from './view-divisions.component';

describe('ViewDivisionsComponent', () => {
  let component: ViewDivisionsComponent;
  let fixture: ComponentFixture<ViewDivisionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDivisionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDivisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
