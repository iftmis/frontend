import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { InspectionIndicatorFormService } from './inspection-indicator-form.service';

describe('InspectionIndicatorFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    })
  );

  it('should be created', () => {
    const service: InspectionIndicatorFormService = TestBed.inject(
      InspectionIndicatorFormService
    );
    expect(service).toBeTruthy();
  });
});
