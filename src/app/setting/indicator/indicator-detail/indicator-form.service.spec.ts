import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { IndicatorFormService } from './indicator-form.service';

describe('IndicatorFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    })
  );

  it('should be created', () => {
    const service: IndicatorFormService = TestBed.inject(IndicatorFormService);
    expect(service).toBeTruthy();
  });
});
