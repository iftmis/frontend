import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { InspectionResolver } from './inspection.resolver';

describe('InspectionResolveService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: InspectionResolver = TestBed.inject(InspectionResolver);
    expect(service).toBeTruthy();
  });
});
