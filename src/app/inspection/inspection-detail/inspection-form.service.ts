import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Inspection } from '../inspection';

@Injectable({
  providedIn: 'root',
})
export class InspectionFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(inspection: Partial<Inspection> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(inspection.id, []),
      name: this.formBuilder.control(inspection.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200),
      ]),
      startDate: this.formBuilder.control(inspection.startDate, [
        Validators.required,
      ]),
      endDate: this.formBuilder.control(inspection.endDate, [
        Validators.required,
      ]),
      inspectionType: this.formBuilder.control(
        { value: inspection.inspectionType, disabled: true },
        [Validators.required]
      ),
      financialYearId: this.formBuilder.control(inspection.financialYearId, [
        Validators.required,
      ]),
      organisationUnitId: this.formBuilder.control(
        inspection.organisationUnitId,
        [Validators.required]
      ),
      termsOfReference: this.formBuilder.control(
        inspection.termsOfReference,
        []
      ),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      name: formGroup.get('name')!.value,
      startDate: formGroup.get('startDate')!.value,
      endDate: formGroup.get('endDate')!.value,
      inspectionType: formGroup.get('inspectionType')!.value,
      financialYearId: formGroup.get('financialYearId')!.value,
      organisationUnitId: formGroup.get('organisationUnitId')!.value,
      termsOfReference: formGroup.get('termsOfReference')!.value,
    };
  }
}
