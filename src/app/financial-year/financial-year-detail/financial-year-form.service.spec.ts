import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { FinancialYearFormService } from './financial-year-form.service';

describe('FinancialYearFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    })
  );

  it('should be created', () => {
    const service: FinancialYearFormService = TestBed.inject(
      FinancialYearFormService
    );
    expect(service).toBeTruthy();
  });
});
