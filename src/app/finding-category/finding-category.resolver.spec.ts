import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { FindingCategoryResolver } from './finding-category.resolver';

describe('FindingCategoryResolveService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: FindingCategoryResolver = TestBed.inject(
      FindingCategoryResolver
    );
    expect(service).toBeTruthy();
  });
});
