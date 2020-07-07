import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { FindingSubCategoryResolver } from './finding-sub-category.resolver';

describe('FindingSubCategoryResolveService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: FindingSubCategoryResolver = TestBed.inject(
      FindingSubCategoryResolver
    );
    expect(service).toBeTruthy();
  });
});
