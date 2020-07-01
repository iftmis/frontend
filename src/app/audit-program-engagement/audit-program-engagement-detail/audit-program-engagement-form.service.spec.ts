import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { AuditProgramEngagementFormService } from './audit-program-engagement-form.service';

describe('AuditProgramEngagementFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    })
  );

  it('should be created', () => {
    const service: AuditProgramEngagementFormService = TestBed.inject(
      AuditProgramEngagementFormService
    );
    expect(service).toBeTruthy();
  });
});
