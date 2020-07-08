import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { QuarterFormService } from './quarter-form.service';

describe('QuarterFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    })
  );

  it('should be created', () => {
    const service: QuarterFormService = TestBed.inject(QuarterFormService);
    expect(service).toBeTruthy();
  });
});
