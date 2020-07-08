import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { FindingSubCategoryFormService } from './finding-sub-category-form.service';

describe('FindingSubCategoryFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    })
  );

  it('should be created', () => {
    const service: FindingSubCategoryFormService = TestBed.inject(
      FindingSubCategoryFormService
    );
    expect(service).toBeTruthy();
  });
});
