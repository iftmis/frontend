import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { SubAreaFormService } from './sub-area-form.service';

describe('SubAreaFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    })
  );

  it('should be created', () => {
    const service: SubAreaFormService = TestBed.inject(SubAreaFormService);
    expect(service).toBeTruthy();
  });
});
