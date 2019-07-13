import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolingStationComponent } from './poling-station.component';

describe('PolingStationComponent', () => {
  let component: PolingStationComponent;
  let fixture: ComponentFixture<PolingStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolingStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolingStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
