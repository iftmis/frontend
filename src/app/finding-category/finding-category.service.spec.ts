import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { FindingCategoryService } from './finding-category.service';

describe('FindingCategoryService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: FindingCategoryService = TestBed.inject(
      FindingCategoryService
    );
    expect(service).toBeTruthy();
  });
});
