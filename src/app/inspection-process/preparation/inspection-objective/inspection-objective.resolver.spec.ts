import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { InspectionObjectiveResolver } from './inspection-objective.resolver';

describe('InspectionObjectiveResolveService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: InspectionObjectiveResolver = TestBed.inject(
      InspectionObjectiveResolver
    );
    expect(service).toBeTruthy();
  });
});
