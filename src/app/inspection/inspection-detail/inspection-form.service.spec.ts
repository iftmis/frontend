import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { InspectionFormService } from './inspection-form.service';

describe('InspectionFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    })
  );

  it('should be created', () => {
    const service: InspectionFormService = TestBed.inject(
      InspectionFormService
    );
    expect(service).toBeTruthy();
  });
});
