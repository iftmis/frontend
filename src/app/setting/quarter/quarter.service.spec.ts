import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { QuarterService } from './quarter.service';

describe('QuarterService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: QuarterService = TestBed.inject(QuarterService);
    expect(service).toBeTruthy();
  });
});
