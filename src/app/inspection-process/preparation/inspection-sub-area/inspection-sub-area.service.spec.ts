import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { InspectionSubAreaService } from './inspection-sub-area.service';

describe('InspectionSubAreaService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: InspectionSubAreaService = TestBed.inject(
      InspectionSubAreaService
    );
    expect(service).toBeTruthy();
  });
});
