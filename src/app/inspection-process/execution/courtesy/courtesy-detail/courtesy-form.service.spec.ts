import { TestBed } from '@angular/core/testing';

import { CourtesyFormService } from './courtesy-form.service';

describe('CourtesyFormService', () => {
  let service: CourtesyFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourtesyFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
