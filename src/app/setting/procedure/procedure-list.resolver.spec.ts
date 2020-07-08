import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ProcedureListResolver } from './procedure-list.resolver';

describe('ProcedureListResolver', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [HttpClientModule] })
  );

  it('should be created', () => {
    const service: ProcedureListResolver = TestBed.inject(
      ProcedureListResolver
    );
    expect(service).toBeTruthy();
  });
});
