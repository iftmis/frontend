import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AuditProgramEngagementService } from './audit-program-engagement.service';

describe('AuditProgramEngagementService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: AuditProgramEngagementService = TestBed.inject(
      AuditProgramEngagementService
    );
    expect(service).toBeTruthy();
  });
});
