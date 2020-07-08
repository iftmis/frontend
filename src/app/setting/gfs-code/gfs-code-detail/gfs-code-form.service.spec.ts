import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { GfsCodeFormService } from './gfs-code-form.service';

describe('GfsCodeFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    })
  );

  it('should be created', () => {
    const service: GfsCodeFormService = TestBed.inject(GfsCodeFormService);
    expect(service).toBeTruthy();
  });
});
