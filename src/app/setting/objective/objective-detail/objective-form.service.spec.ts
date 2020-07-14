import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { ObjectiveFormService } from './objective-form.service';

describe('ObjectiveFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    })
  );

  it('should be created', () => {
    const service: ObjectiveFormService = TestBed.inject(ObjectiveFormService);
    expect(service).toBeTruthy();
  });
});
