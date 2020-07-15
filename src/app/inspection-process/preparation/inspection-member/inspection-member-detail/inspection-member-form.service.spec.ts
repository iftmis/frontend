import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { InspectionMemberFormService } from './inspection-member-form.service';

describe('InspectionMemberFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    })
  );

  it('should be created', () => {
    const service: InspectionMemberFormService = TestBed.inject(
      InspectionMemberFormService
    );
    expect(service).toBeTruthy();
  });
});
