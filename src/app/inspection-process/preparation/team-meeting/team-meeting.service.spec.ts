import { TestBed } from '@angular/core/testing';

import { TeamMeetingService } from './team-meeting.service';

describe('TeamMeetingService', () => {
  let service: TeamMeetingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamMeetingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
