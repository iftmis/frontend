import { TestBed } from '@angular/core/testing';

import { BriefyingMembersService } from './briefying-members.service';

describe('BriefyingMembersService', () => {
  let service: BriefyingMembersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BriefyingMembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
