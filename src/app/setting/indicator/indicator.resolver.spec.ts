import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { IndicatorResolver } from './indicator.resolver';

describe('IndicatorResolveService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: IndicatorResolver = TestBed.inject(IndicatorResolver);
    expect(service).toBeTruthy();
  });
});
