import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { InspectionPlanListResolver } from './inspection-plan-list.resolver';

describe('InspectionPlanListResolver', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [HttpClientModule] })
  );

  it('should be created', () => {
    const service: InspectionPlanListResolver = TestBed.inject(
      InspectionPlanListResolver
    );
    expect(service).toBeTruthy();
  });
});
