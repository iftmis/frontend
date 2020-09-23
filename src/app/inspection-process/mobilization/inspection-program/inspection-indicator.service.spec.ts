import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { InspectionIndicatorService } from './inspection-indicator.service';

describe('InspectionIndicatorService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: InspectionIndicatorService = TestBed.inject(
      InspectionIndicatorService
    );
    expect(service).toBeTruthy();
  });
});
