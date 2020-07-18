import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { InspectionObjectiveService } from './inspection-objective.service';

describe('InspectionObjectiveService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: InspectionObjectiveService = TestBed.inject(
      InspectionObjectiveService
    );
    expect(service).toBeTruthy();
  });
});
