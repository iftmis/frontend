import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { InspectionSubAreaResolver } from './inspection-sub-area.resolver';

describe('InspectionSubAreaResolveService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: InspectionSubAreaResolver = TestBed.inject(
      InspectionSubAreaResolver
    );
    expect(service).toBeTruthy();
  });
});
