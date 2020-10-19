import { TestBed } from '@angular/core/testing';

import { BriefingMembersService } from './briefing-members.service';

describe('BriefingMembersService', () => {
  let service: BriefingMembersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BriefingMembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
