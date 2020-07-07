import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { FinancialYearListResolver } from './financial-year-list.resolver';

describe('FinancialYearListResolver', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [HttpClientModule] })
  );

  it('should be created', () => {
    const service: FinancialYearListResolver = TestBed.inject(
      FinancialYearListResolver
    );
    expect(service).toBeTruthy();
  });
});
