import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { InspectionBudgetService } from './inspection-budget.service';

describe('InspectionBudgetService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: InspectionBudgetService = TestBed.inject(
      InspectionBudgetService
    );
    expect(service).toBeTruthy();
  });
});
