import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { InspectionIndicator } from '../inspection-indicator';

@Injectable({
  providedIn: 'root',
})
export class InspectionIndicatorFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(inspectionIndicator: Partial<InspectionIndicator> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(inspectionIndicator.id, []),
      name: this.formBuilder.control(inspectionIndicator.name, [
        Validators.minLength(2),
        Validators.maxLength(1000),
      ]),
      inspectionSubAreaId: this.formBuilder.control(
        inspectionIndicator.inspectionSubAreaId,
        [Validators.required]
      ),
      indicatorId: this.formBuilder.control(
        inspectionIndicator.indicatorId,
        []
      ),
      indicatorName: this.formBuilder.control(
        inspectionIndicator.indicatorName,
        []
      ),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      name: formGroup.get('name')!.value,
      inspectionSubAreaId: formGroup.get('inspectionSubAreaId')!.value,
      indicatorId: formGroup.get('indicatorId')!.value,
      indicatorName: formGroup.get('indicatorName')!.value,
    };
  }
}
