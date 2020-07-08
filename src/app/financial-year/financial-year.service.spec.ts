import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { FinancialYearService } from './financial-year.service';

describe('FinancialYearService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: FinancialYearService = TestBed.inject(FinancialYearService);
    expect(service).toBeTruthy();
  });
});
