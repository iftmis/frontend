import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { FindingSubCategoryListResolver } from './finding-sub-category-list.resolver';

describe('FindingSubCategoryListResolver', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [HttpClientModule] })
  );

  it('should be created', () => {
    const service: FindingSubCategoryListResolver = TestBed.inject(
      FindingSubCategoryListResolver
    );
    expect(service).toBeTruthy();
  });
});
