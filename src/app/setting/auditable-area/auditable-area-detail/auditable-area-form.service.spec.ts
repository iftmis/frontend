import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { AuditableAreaFormService } from './auditable-area-form.service';

describe('AuditableAreaFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    })
  );

  it('should be created', () => {
    const service: AuditableAreaFormService = TestBed.inject(
      AuditableAreaFormService
    );
    expect(service).toBeTruthy();
  });
});
