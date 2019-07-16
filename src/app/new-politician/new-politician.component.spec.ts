import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPoliticianComponent } from './new-politician.component';

describe('NewPoliticianComponent', () => {
  let component: NewPoliticianComponent;
  let fixture: ComponentFixture<NewPoliticianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPoliticianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPoliticianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
