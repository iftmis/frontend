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
      fullName: this.formBuilder.control(inspectionMember.fullName, [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: this.formBuilder.control(inspectionMember.email, []),
      role: this.formBuilder.control(inspectionMember.role, []),
      userId: this.formBuilder.control(inspectionMember.userId, [
        Validators.required,
      ]),
      userFullName: this.formBuilder.control(inspectionMember.userFullName, []),
      letterAttachmentId: this.formBuilder.control(
        inspectionMember.letterAttachmentId,
        []
      ),
      letterAttachmentPath: this.formBuilder.control(
        inspectionMember.letterAttachmentPath,
        []
      ),
      declarationAttachementId: this.formBuilder.control(
        inspectionMember.declarationAttachementId,
        []
      ),
      declarationAttachmentName: this.formBuilder.control(
        inspectionMember.declarationAttachmentName,
        []
      ),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      fullName: formGroup.get('fullName')!.value,
      email: formGroup.get('email')!.value,
      role: formGroup.get('role')!.value,
      userId: formGroup.get('userId')!.value,
      userFullName: formGroup.get('userFullName')!.value,
      letterAttachmentId: formGroup.get('letterAttachmentId')!.value,
      letterAttachmentPath: formGroup.get('letterAttachmentPath')!.value,
      declarationAttachementId: formGroup.get('declarationAttachementId')!
        .value,
      declarationAttachmentName: formGroup.get('declarationAttachmentName')!
        .value,
    };
  }
}
