import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { InspectionWorkDone } from '../inspection-work-done';

@Injectable({
  providedIn: 'root',
})
export class InspectionWorkDoneFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(inspectionWorkDone: Partial<InspectionWorkDone> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(inspectionWorkDone.id, []),
      name: this.formBuilder.control(inspectionWorkDone.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200),
      ]),
      result: this.formBuilder.control(inspectionWorkDone.result, []),
      fileResourceId: this.formBuilder.control(
        inspectionWorkDone.fileResourceId,
        []
      ),
      procedureId: this.formBuilder.control(inspectionWorkDone.procedureId, []),
      fileResourceContentId: this.formBuilder.control(
        inspectionWorkDone.fileResourceContentId,
        []
      ),
      isOk: this.formBuilder.control(inspectionWorkDone.isOk, []),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      name: formGroup.get('name')!.value,
      result: formGroup.get('result')!.value,
      fileResourceId: formGroup.get('fileResourceId')!.value,
      procedureId: formGroup.get('procedureId')!.value,
      fileResourceContentId: formGroup.get('fileResourceContentId')!.value,
      isOk: formGroup.get('isOk')!.value,
    };
  }
}
