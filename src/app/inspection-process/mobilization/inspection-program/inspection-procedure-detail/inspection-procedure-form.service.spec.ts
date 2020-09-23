import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { InspectionProcedureFormService } from './inspection-procedure-form.service';

describe('InspectionProcedureFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    })
  );

  it('should be created', () => {
    const service: InspectionProcedureFormService = TestBed.inject(
      InspectionProcedureFormService
    );
    expect(service).toBeTruthy();
  });
});
