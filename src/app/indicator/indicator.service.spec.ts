import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { IndicatorService } from './indicator.service';

describe('IndicatorService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: IndicatorService = TestBed.inject(IndicatorService);
    expect(service).toBeTruthy();
  });
});
