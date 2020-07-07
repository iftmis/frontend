import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { FindingCategoryListResolver } from './finding-category-list.resolver';

describe('FindingCategoryListResolver', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [HttpClientModule] })
  );

  it('should be created', () => {
    const service: FindingCategoryListResolver = TestBed.inject(
      FindingCategoryListResolver
    );
    expect(service).toBeTruthy();
  });
});
