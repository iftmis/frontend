import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ProcedureResolver } from './procedure.resolver';

describe('ProcedureResolveService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: ProcedureResolver = TestBed.inject(ProcedureResolver);
    expect(service).toBeTruthy();
  });
});
