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
      FinancialYearID: this.formBuilder.control(
        inspectionPlan.FinancialYearID,
        [Validators.required]
      ),
      financialYearName: this.formBuilder.control(
        inspectionPlan.financialYearName,
        [Validators.required]
      ),
      OrganizationUnitID: this.formBuilder.control(
        inspectionPlan.OrganizationUnitID,
        [Validators.required]
      ),
      OrganizationUnitName: this.formBuilder.control(
        inspectionPlan.OrganizationUnitName,
        [Validators.required]
      ),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      FinancialYearID: formGroup.get('FinancialYearID')!.value,
      financialYearName: formGroup.get('financialYearName')!.value,
      OrganizationUnitID: formGroup.get('OrganizationUnitID')!.value,
      OrganizationUnitName: formGroup.get('OrganizationUnitName')!.value,
    };
  }
}
