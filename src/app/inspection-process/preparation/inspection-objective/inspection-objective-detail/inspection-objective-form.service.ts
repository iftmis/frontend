import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { InspectionObjective } from '../inspection-objective';

@Injectable({
  providedIn: 'root',
})
export class InspectionObjectiveFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(inspectionObjective: Partial<InspectionObjective> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(inspectionObjective.id, []),
      name: this.formBuilder.control(inspectionObjective.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200),
      ]),
      inspectionAreaId: this.formBuilder.control(
        inspectionObjective.inspectionAreaId,
        [Validators.required]
      ),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      name: formGroup.get('name')!.value,
      inspectionAreaId: formGroup.get('inspectionAreaId')!.value,
    };
  }
}
