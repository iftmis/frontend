import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { InspectionActivities } from '../inspection-activities';

@Injectable({
  providedIn: 'root',
})
export class InspectionActivitiesFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(inspectionActivities: Partial<InspectionActivities> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(inspectionActivities.id, []),
      objectiveId: this.formBuilder.control(inspectionActivities.objectiveId, [
        Validators.required,
      ]),
      auditableAreaId: this.formBuilder.control(
        inspectionActivities.auditableAreaId,
        [Validators.required]
      ),
      subAreaId: this.formBuilder.control(inspectionActivities.subAreaId, [
        Validators.required,
      ]),
      activity: this.formBuilder.control(inspectionActivities.activity, [
        Validators.required,
      ]),
      days: this.formBuilder.control(inspectionActivities.days, [
        Validators.required,
      ]),
      quarter_one: this.formBuilder.control(inspectionActivities.quarter_one, [
        Validators.required,
      ]),
      quarter_two: this.formBuilder.control(inspectionActivities.quarter_two, [
        Validators.required,
      ]),
      quarter_three: this.formBuilder.control(
        inspectionActivities.quarter_three,
        [Validators.required]
      ),
      quarter_four: this.formBuilder.control(
        inspectionActivities.quarter_four,
        [Validators.required]
      ),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      objectiveId: formGroup.get('objectiveId')!.value,
      auditableAreaId: formGroup.get('auditableAreaId')!.value,
      subAreaId: formGroup.get('subAreaId')!.value,
      activity: formGroup.get('activity')!.value,
      days: formGroup.get('days')!.value,
      quarter_one: formGroup.get('quarter_one')!.value,
      quarter_two: formGroup.get('quarter_two')!.value,
      quarter_three: formGroup.get('quarter_three')!.value,
      quarter_four: formGroup.get('quarter_four')!.value,
      inspectionPlanId: formGroup.get('inspectionPlanId')!.value,
      risks: formGroup.get('risk')!.value,
      organisationUnits: formGroup.get('organisation')!.value,
    };
  }
}
