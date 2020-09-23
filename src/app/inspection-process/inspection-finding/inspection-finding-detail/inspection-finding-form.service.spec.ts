import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { InspectionFindingFormService } from './inspection-finding-form.service';

describe('InspectionFindingFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    })
  );

  it('should be created', () => {
    const service: InspectionFindingFormService = TestBed.inject(
      InspectionFindingFormService
    );
    expect(service).toBeTruthy();
  });
});
