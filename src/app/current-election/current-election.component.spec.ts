import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentElectionComponent } from './current-election.component';

describe('CurrentElectionComponent', () => {
  let component: CurrentElectionComponent;
  let fixture: ComponentFixture<CurrentElectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentElectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
