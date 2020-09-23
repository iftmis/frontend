import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { TeamMeetingTimelineService } from './team-meeting-timeline.service';

describe('TeamMeetingTimelineService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: TeamMeetingTimelineService = TestBed.inject(
      TeamMeetingTimelineService
    );
    expect(service).toBeTruthy();
  });
});
