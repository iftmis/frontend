import { TestBed } from '@angular/core/testing';

import { BriefingUploadService } from './briefing-upload.service';

describe('BriefingUploadService', () => {
  let service: BriefingUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BriefingUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
