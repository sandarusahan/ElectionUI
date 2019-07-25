import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComissionerComponent } from './login-comissioner.component';

describe('LoginComissionerComponent', () => {
  let component: LoginComissionerComponent;
  let fixture: ComponentFixture<LoginComissionerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComissionerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComissionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
