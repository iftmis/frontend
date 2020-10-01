import { TestBed } from '@angular/core/testing';

import { BriefyingUploadService } from './briefying-upload.service';

describe('BriefyingUploadService', () => {
  let service: BriefyingUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BriefyingUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
