import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { QuarterListResolver } from './quarter-list.resolver';

describe('QuarterListResolver', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [HttpClientModule] })
  );

  it('should be created', () => {
    const service: QuarterListResolver = TestBed.inject(QuarterListResolver);
    expect(service).toBeTruthy();
  });
});
