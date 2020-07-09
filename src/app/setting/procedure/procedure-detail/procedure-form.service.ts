import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Procedure } from '../procedure';

@Injectable({
  providedIn: 'root',
})
export class ProcedureFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(procedure: Partial<Procedure> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(procedure.id, []),
      indicatorId: this.formBuilder.control(procedure.indicatorId, [
        Validators.required,
      ]),
      indicatorName: this.formBuilder.control(procedure.indicatorName, []),
      name: this.formBuilder.control(procedure.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200),
      ]),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      indicatorId: formGroup.get('indicatorId')!.value,
      indicatorName: formGroup.get('indicatorName')!.value,
      name: formGroup.get('name')!.value,
    };
  }
}
