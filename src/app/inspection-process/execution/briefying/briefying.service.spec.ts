import { TestBed } from '@angular/core/testing';

import { BriefyingService } from './briefying.service';

describe('BriefyingService', () => {
  let service: BriefyingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BriefyingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
