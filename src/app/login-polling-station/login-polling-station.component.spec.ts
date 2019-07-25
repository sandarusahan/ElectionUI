import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPollingStationComponent } from './login-polling-station.component';

describe('LoginPollingStationComponent', () => {
  let component: LoginPollingStationComponent;
  let fixture: ComponentFixture<LoginPollingStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPollingStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPollingStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
