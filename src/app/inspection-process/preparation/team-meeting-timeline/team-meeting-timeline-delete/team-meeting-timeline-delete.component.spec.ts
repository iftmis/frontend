import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MaterialModule } from 'src/app/material/material.module';
import { TeamMeetingTimelineDeleteComponent } from './team-meeting-timeline-delete.component';

describe('TeamMeetingTimelineDeleteComponent', () => {
  let component: TeamMeetingTimelineDeleteComponent;
  let fixture: ComponentFixture<TeamMeetingTimelineDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamMeetingTimelineDeleteComponent],
      imports: [NoopAnimationsModule, MaterialModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMeetingTimelineDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
