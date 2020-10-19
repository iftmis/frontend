import { TestBed } from '@angular/core/testing';

import { BriefingFormService } from './briefing-form.service';

describe('BriefingFormService', () => {
  let service: BriefingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BriefingFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
