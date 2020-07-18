import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { InspectionPlanFormService } from './inspection-plan-form.service';

describe('InspectionPlanFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    })
  );

  it('should be created', () => {
    const service: InspectionPlanFormService = TestBed.inject(
      InspectionPlanFormService
    );
    expect(service).toBeTruthy();
  });
});
