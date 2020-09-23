import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { InspectionSubArea } from '../inspection-sub-area';

@Injectable({
  providedIn: 'root',
})
export class InspectionSubAreaFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(inspectionSubArea: Partial<InspectionSubArea> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(inspectionSubArea.id, []),
      generalObjective: this.formBuilder.control(
        inspectionSubArea.generalObjective,
        [Validators.required, Validators.minLength(2)]
      ),
      inspectionAreaId: this.formBuilder.control(
        { value: inspectionSubArea.inspectionAreaId, disabled: true },
        [Validators.required]
      ),
      subAreaId: this.formBuilder.control(inspectionSubArea.subAreaId, [
        Validators.required,
      ]),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      generalObjective: formGroup.get('generalObjective')!.value,
      inspectionAreaId: formGroup.get('inspectionAreaId')!.value,
      subAreaId: formGroup.get('subAreaId')!.value,
    };
  }
}
