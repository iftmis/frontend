import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { InspectionPlan } from '../inspection-plan';

@Injectable({
  providedIn: 'root',
})
export class InspectionPlanFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(inspectionPlan: Partial<InspectionPlan> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(inspectionPlan.id, []),

      name: this.formBuilder.control(inspectionPlan.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2000),
      ]),
      financialYearId: this.formBuilder.control(
        inspectionPlan.financialYearId,
        [Validators.required]
      ),
      // financialYearName: this.formBuilder.control(
      //   inspectionPlan.financialYearName
      // ),
      organisationUnitId: this.formBuilder.control(
        inspectionPlan.organisationUnitId,
        [Validators.required]
      ),
      // organisationUnitName: this.formBuilder.control(
      //   inspectionPlan.organisationUnitName
      // ),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      name: formGroup.get('name')!.value,
      financialYearId: formGroup.get('financialYearId')!.value,
      //   financialYearName: formGroup.get('financialYearName')!.value,
      organisationUnitId: formGroup.get('organisationUnitId')!.value,
      // organisationUnitName: formGroup.get('organisationUnitName')!.value,
    };
  }
}
