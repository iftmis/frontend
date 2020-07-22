import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { InspectionSubAreaFormService } from './inspection-sub-area-form.service';

describe('InspectionSubAreaFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    })
  );

  it('should be created', () => {
    const service: InspectionSubAreaFormService = TestBed.inject(
      InspectionSubAreaFormService
    );
    expect(service).toBeTruthy();
  });
});
