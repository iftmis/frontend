import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { AuditableArea } from '../auditable-area';

@Injectable({
  providedIn: 'root',
})
export class AuditableAreaFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(auditableArea: Partial<AuditableArea> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(auditableArea.id, []),
      code: this.formBuilder.control(auditableArea.code, [
        Validators.minLength(1),
        Validators.maxLength(64),
      ]),
      name: this.formBuilder.control(auditableArea.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2000),
      ]),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      code: formGroup.get('code')!.value,
      name: formGroup.get('name')!.value,
    };
  }
}
