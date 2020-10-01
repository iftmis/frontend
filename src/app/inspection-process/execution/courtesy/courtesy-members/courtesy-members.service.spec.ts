import { TestBed } from '@angular/core/testing';

import { CourtesyMembersService } from './courtesy-members.service';

describe('CourtesyMembersService', () => {
  let service: CourtesyMembersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourtesyMembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
