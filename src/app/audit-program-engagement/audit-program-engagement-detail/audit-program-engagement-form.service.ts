import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { AuditProgramEngagement } from '../audit-program-engagement';

@Injectable({
  providedIn: 'root',
})
export class AuditProgramEngagementFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(auditProgramEngagement: Partial<AuditProgramEngagement> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(auditProgramEngagement.id, []),
      process: this.formBuilder.control(auditProgramEngagement.process, [
        Validators.required,
      ]),
      subProcess: this.formBuilder.control(
        auditProgramEngagement.subProcess,
        []
      ),
      subSubProcess: this.formBuilder.control(
        auditProgramEngagement.subSubProcess,
        []
      ),
      auditableAreaId: this.formBuilder.control(
        auditProgramEngagement.auditableAreaId,
        []
      ),
      auditableAreaName: this.formBuilder.control(
        auditProgramEngagement.auditableAreaName,
        []
      ),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      process: formGroup.get('process')!.value,
      subProcess: formGroup.get('subProcess')!.value,
      subSubProcess: formGroup.get('subSubProcess')!.value,
      auditableAreaId: formGroup.get('auditableAreaId')!.value,
      auditableAreaName: formGroup.get('auditableAreaName')!.value,
    };
  }
}
