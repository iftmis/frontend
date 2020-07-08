import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { IndicatorListResolver } from './indicator-list.resolver';

describe('IndicatorListResolver', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [HttpClientModule] })
  );

  it('should be created', () => {
    const service: IndicatorListResolver = TestBed.inject(
      IndicatorListResolver
    );
    expect(service).toBeTruthy();
  });
});
