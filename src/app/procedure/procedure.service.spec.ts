import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ProcedureService } from './procedure.service';

describe('ProcedureService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: ProcedureService = TestBed.inject(ProcedureService);
    expect(service).toBeTruthy();
  });
});
