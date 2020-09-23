import { TestBed } from '@angular/core/testing';

import { BriefyingFormService } from './briefying-form.service';

describe('BriefyingFormService', () => {
  let service: BriefyingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BriefyingFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
