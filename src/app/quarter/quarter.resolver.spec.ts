import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { QuarterResolver } from './quarter.resolver';

describe('QuarterResolveService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: QuarterResolver = TestBed.inject(QuarterResolver);
    expect(service).toBeTruthy();
  });
});
