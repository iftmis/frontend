import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { ProcedureFormService } from './procedure-form.service';

describe('ProcedureFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    })
  );

  it('should be created', () => {
    const service: ProcedureFormService = TestBed.inject(ProcedureFormService);
    expect(service).toBeTruthy();
  });
});
