import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AuditableAreaService } from './auditable-area.service';

describe('AuditableAreaService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: AuditableAreaService = TestBed.inject(AuditableAreaService);
    expect(service).toBeTruthy();
  });
});
