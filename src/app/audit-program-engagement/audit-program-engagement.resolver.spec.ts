import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AuditProgramEngagementResolver } from './audit-program-engagement.resolver';

describe('AuditProgramEngagementResolveService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: AuditProgramEngagementResolver = TestBed.inject(
      AuditProgramEngagementResolver
    );
    expect(service).toBeTruthy();
  });
});
