import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { OrganisationUnitFormService } from './organisation-unit-form.service';

describe('OrganisationUnitFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    })
  );

  it('should be created', () => {
    const service: OrganisationUnitFormService = TestBed.inject(
      OrganisationUnitFormService
    );
    expect(service).toBeTruthy();
  });
});
