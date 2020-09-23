import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMeetingComponent } from './team-meeting.component';

describe('TeamMeetingComponent', () => {
  let component: TeamMeetingComponent;
  let fixture: ComponentFixture<TeamMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamMeetingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
