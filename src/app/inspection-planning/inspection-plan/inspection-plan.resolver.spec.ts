import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { InspectionPlanResolver } from './inspection-plan.resolver';

describe('InspectionPlanResolveService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: InspectionPlanResolver = TestBed.inject(
      InspectionPlanResolver
    );
    expect(service).toBeTruthy();
  });
});
