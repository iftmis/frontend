import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { InspectionService } from './inspection.service';

describe('InspectionService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: InspectionService = TestBed.inject(InspectionService);
    expect(service).toBeTruthy();
  });
});
