import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPollingStationComponent } from './view-polling-station.component';

describe('ViewPollingStationComponent', () => {
  let component: ViewPollingStationComponent;
  let fixture: ComponentFixture<ViewPollingStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPollingStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPollingStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
