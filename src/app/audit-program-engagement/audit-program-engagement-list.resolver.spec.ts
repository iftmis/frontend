import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AuditProgramEngagementListResolver } from './audit-program-engagement-list.resolver';

describe('AuditProgramEngagementListResolver', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [HttpClientModule] })
  );

  it('should be created', () => {
    const service: AuditProgramEngagementListResolver = TestBed.inject(
      AuditProgramEngagementListResolver
    );
    expect(service).toBeTruthy();
  });
});
