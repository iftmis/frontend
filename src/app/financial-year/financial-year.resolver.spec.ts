import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { FinancialYearResolver } from './financial-year.resolver';

describe('FinancialYearResolveService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: FinancialYearResolver = TestBed.inject(
      FinancialYearResolver
    );
    expect(service).toBeTruthy();
  });
});
