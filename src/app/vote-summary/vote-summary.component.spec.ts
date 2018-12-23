import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteSummaryComponent } from './vote-summary.component';

describe('VoteSummaryComponent', () => {
  let component: VoteSummaryComponent;
  let fixture: ComponentFixture<VoteSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
