import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { InspectionBudgetFormService } from './inspection-budget-form.service';

describe('InspectionBudgetFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    })
  );

  it('should be created', () => {
    const service: InspectionBudgetFormService = TestBed.inject(
      InspectionBudgetFormService
    );
    expect(service).toBeTruthy();
  });
});
