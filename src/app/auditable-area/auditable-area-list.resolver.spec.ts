import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AuditableAreaListResolver } from './auditable-area-list.resolver';

describe('AuditableAreaListResolver', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [HttpClientModule] })
  );

  it('should be created', () => {
    const service: AuditableAreaListResolver = TestBed.inject(
      AuditableAreaListResolver
    );
    expect(service).toBeTruthy();
  });
});
