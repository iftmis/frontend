import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { OrganisationUnitLevelFormService } from './organisation-unit-level-form.service';

describe('OrganisationUnitLevelFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    })
  );

  it('should be created', () => {
    const service: OrganisationUnitLevelFormService = TestBed.inject(
      OrganisationUnitLevelFormService
    );
    expect(service).toBeTruthy();
  });
});
