import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamIssueComponent } from './team-issue.component';

describe('TeamIssueComponent', () => {
  let component: TeamIssueComponent;
  let fixture: ComponentFixture<TeamIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
