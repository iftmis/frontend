import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { FindingCategoryFormService } from './finding-category-form.service';

describe('FindingCategoryFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    })
  );

  it('should be created', () => {
    const service: FindingCategoryFormService = TestBed.inject(
      FindingCategoryFormService
    );
    expect(service).toBeTruthy();
  });
});
