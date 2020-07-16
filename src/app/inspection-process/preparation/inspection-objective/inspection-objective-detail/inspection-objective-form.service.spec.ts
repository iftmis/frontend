import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { InspectionObjectiveFormService } from './inspection-objective-form.service';

describe('InspectionObjectiveFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    })
  );

  it('should be created', () => {
    const service: InspectionObjectiveFormService = TestBed.inject(
      InspectionObjectiveFormService
    );
    expect(service).toBeTruthy();
  });
});
