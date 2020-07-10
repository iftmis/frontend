import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { OrganisationUnitLevel } from '../organisation-unit-level';

@Injectable({
  providedIn: 'root',
})
export class OrganisationUnitLevelFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(organisationUnitLevel: Partial<OrganisationUnitLevel> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(organisationUnitLevel.id, []),
      code: this.formBuilder.control(organisationUnitLevel.code, [
        Validators.minLength(1),
        Validators.maxLength(64),
      ]),
      name: this.formBuilder.control(organisationUnitLevel.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200),
      ]),
      level: this.formBuilder.control(organisationUnitLevel.level, [
        Validators.required,
      ]),
      isInspectionLevel: this.formBuilder.control(
        organisationUnitLevel.isInspectionLevel,
        []
      ),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      code: formGroup.get('code')!.value,
      name: formGroup.get('name')!.value,
      level: formGroup.get('level')!.value,
      isInspectionLevel: formGroup.get('isInspectionLevel')!.value,
    };
  }
}
