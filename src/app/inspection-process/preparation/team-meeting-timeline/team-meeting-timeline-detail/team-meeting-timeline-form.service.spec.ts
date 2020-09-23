import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { TeamMeetingTimelineFormService } from './team-meeting-timeline-form.service';

describe('TeamMeetingTimelineFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    })
  );

  it('should be created', () => {
    const service: TeamMeetingTimelineFormService = TestBed.inject(
      TeamMeetingTimelineFormService
    );
    expect(service).toBeTruthy();
  });
});
