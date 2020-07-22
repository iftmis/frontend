import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { InspectionProcedure } from '../inspection-procedure';

@Injectable({
  providedIn: 'root',
})
export class InspectionProcedureFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(inspectionProcedure: Partial<InspectionProcedure> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(inspectionProcedure.id, []),
      name: this.formBuilder.control(inspectionProcedure.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(1000),
      ]),
      inspectionIndicatorId: this.formBuilder.control(
        inspectionProcedure.inspectionIndicatorId,
        [Validators.required]
      ),
      inspectionIndicatorName: this.formBuilder.control(
        inspectionProcedure.inspectionIndicatorName,
        []
      ),
      indicatorId: this.formBuilder.control(
        inspectionProcedure.indicatorId,
        []
      ),
      indicatorName: this.formBuilder.control(
        inspectionProcedure.indicatorName,
        []
      ),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      name: formGroup.get('name')!.value,
      inspectionIndicatorId: formGroup.get('inspectionIndicatorId')!.value,
      inspectionIndicatorName: formGroup.get('inspectionIndicatorName')!.value,
      indicatorId: formGroup.get('indicatorId')!.value,
      indicatorName: formGroup.get('indicatorName')!.value,
    };
  }
}
