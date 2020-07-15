import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { InspectionMember } from '../inspection-member';

@Injectable({
  providedIn: 'root',
})
export class InspectionMemberFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(inspectionMember: Partial<InspectionMember> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(inspectionMember.id, []),
      role: this.formBuilder.control(inspectionMember.role, []),
      userId: this.formBuilder.control(inspectionMember.userId, [
        Validators.required,
      ]),
      inspectionId: this.formBuilder.control(inspectionMember.inspectionId, [
        Validators.required,
      ]),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      role: formGroup.get('role')!.value,
      userId: formGroup.get('userId')!.value,
      inspectionId: formGroup.get('inspectionId')!.value,
    };
  }
}
