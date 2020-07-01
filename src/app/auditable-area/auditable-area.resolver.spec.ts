import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AuditableAreaResolver } from './auditable-area.resolver';

describe('AuditableAreaResolveService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: AuditableAreaResolver = TestBed.inject(
      AuditableAreaResolver
    );
    expect(service).toBeTruthy();
  });
});
