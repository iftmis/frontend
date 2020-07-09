import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { InspectionListResolver } from './inspection-list.resolver';

describe('InspectionListResolver', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [HttpClientModule] })
  );

  it('should be created', () => {
    const service: InspectionListResolver = TestBed.inject(
      InspectionListResolver
    );
    expect(service).toBeTruthy();
  });
});
