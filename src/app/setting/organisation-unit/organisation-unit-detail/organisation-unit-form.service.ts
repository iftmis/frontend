import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { OrganisationUnit } from '../organisation-unit';

@Injectable({
  providedIn: 'root',
})
export class OrganisationUnitFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(organisationUnit: Partial<OrganisationUnit> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(organisationUnit.id, []),
      code: this.formBuilder.control(organisationUnit.code, [
        Validators.minLength(1),
        Validators.maxLength(64),
      ]),
      name: this.formBuilder.control(organisationUnit.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200),
      ]),
      address: this.formBuilder.control(organisationUnit.address, [
        Validators.minLength(2),
        Validators.maxLength(200),
      ]),
      phoneNumber: this.formBuilder.control(organisationUnit.phoneNumber, [
        Validators.minLength(10),
        Validators.maxLength(20),
      ]),
      email: this.formBuilder.control(organisationUnit.email, [
        Validators.minLength(2),
        Validators.maxLength(200),
      ]),
      background: this.formBuilder.control(organisationUnit.background, []),
      logo: this.formBuilder.control(organisationUnit.logo, []),
      logoContentType: this.formBuilder.control(
        organisationUnit.logoContentType,
        []
      ),
      organisationUnitLevel: this.formBuilder.control(
        organisationUnit.organisationUnitLevel,
        []
      ),
      parent: this.formBuilder.control(organisationUnit.parent, []),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      code: formGroup.get('code')!.value,
      name: formGroup.get('name')!.value,
      address: formGroup.get('address')!.value,
      phoneNumber: formGroup.get('phoneNumber')!.value,
      email: formGroup.get('email')!.value,
      background: formGroup.get('background')!.value,
      logo: formGroup.get('logo')!.value,
      logoContentType: formGroup.get('logoContentType')!.value,
      organisationUnitLevel: formGroup.get('organisationUnitLevel')!.value,
      parent: formGroup.get('parent')!.value,
    };
  }
}
