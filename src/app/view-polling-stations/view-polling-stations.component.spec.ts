import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPollingStationsComponent } from './view-polling-stations.component';

describe('ViewPollingStationsComponent', () => {
  let component: ViewPollingStationsComponent;
  let fixture: ComponentFixture<ViewPollingStationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPollingStationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPollingStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
