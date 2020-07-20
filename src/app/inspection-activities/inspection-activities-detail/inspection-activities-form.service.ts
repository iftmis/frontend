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
      objectiveName: this.formBuilder.control(
        inspectionActivities.objectiveName,
        []
      ),
      auditableAreaId: this.formBuilder.control(
        inspectionActivities.auditableAreaId,
        [Validators.required]
      ),
      auditableAreaName: this.formBuilder.control(
        inspectionActivities.auditableAreaName,
        []
      ),
      subAreaId: this.formBuilder.control(inspectionActivities.subAreaId, [
        Validators.required,
      ]),
      subAreaName: this.formBuilder.control(
        inspectionActivities.subAreaName,
        []
      ),
      activity: this.formBuilder.control(inspectionActivities.activity, [
        Validators.required,
      ]),
      quarter1: this.formBuilder.control(inspectionActivities.quarter1, [
        Validators.required,
      ]),
      quarter2: this.formBuilder.control(inspectionActivities.quarter2, [
        Validators.required,
      ]),
      quarter3: this.formBuilder.control(inspectionActivities.quarter3, [
        Validators.required,
      ]),
      quarter4: this.formBuilder.control(inspectionActivities.quarter4, [
        Validators.required,
      ]),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      objectiveId: formGroup.get('objectiveId')!.value,
      objectiveName: formGroup.get('objectiveName')!.value,
      auditableAreaId: formGroup.get('auditableAreaId')!.value,
      auditableAreaName: formGroup.get('auditableAreaName')!.value,
      subAreaId: formGroup.get('subAreaId')!.value,
      subAreaName: formGroup.get('subAreaName')!.value,
      activity: formGroup.get('activity')!.value,
      quarter1: formGroup.get('quarter1')!.value,
      quarter2: formGroup.get('quarter2')!.value,
      quarter3: formGroup.get('quarter3')!.value,
      quarter4: formGroup.get('quarter4')!.value,
    };
  }
}
