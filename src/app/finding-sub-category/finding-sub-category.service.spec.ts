import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { FindingSubCategoryService } from './finding-sub-category.service';

describe('FindingSubCategoryService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: FindingSubCategoryService = TestBed.inject(
      FindingSubCategoryService
    );
    expect(service).toBeTruthy();
  });
});
