import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { InspectionPlanService } from './inspection-plan.service';

describe('InspectionPlanService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: InspectionPlanService = TestBed.inject(
      InspectionPlanService
    );
    expect(service).toBeTruthy();
  });
});
