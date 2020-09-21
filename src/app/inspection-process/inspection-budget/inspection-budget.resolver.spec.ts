import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { InspectionBudgetResolver } from './inspection-budget.resolver';

describe('InspectionBudgetResolveService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: InspectionBudgetResolver = TestBed.inject(
      InspectionBudgetResolver
    );
    expect(service).toBeTruthy();
  });
});
