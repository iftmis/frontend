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
      FinancialYearID: this.formBuilder.control(
        inspectionPlan.FinancialYearID,
        [Validators.required]
      ),
      FinancialYearName: this.formBuilder.control(
        inspectionPlan.FinancialYearName
      ),
      OrganizationUnitID: this.formBuilder.control(
        inspectionPlan.OrganizationUnitID,
        [Validators.required]
      ),
      OrganizationUnitName: this.formBuilder.control(
        inspectionPlan.OrganizationUnitName
      ),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      name: formGroup.get('name')!.value,
      FinancialYearID: formGroup.get('FinancialYearID')!.value,
      FinancialYearName: formGroup.get('FinancialYearName')!.value,
      OrganizationUnitID: formGroup.get('OrganizationUnitID')!.value,
      OrganizationUnitName: formGroup.get('OrganizationUnitName')!.value,
    };
  }
}
