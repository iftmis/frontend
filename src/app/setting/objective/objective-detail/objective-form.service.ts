import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Objective } from '../objective';

@Injectable({
  providedIn: 'root',
})
export class ObjectiveFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(objective: Partial<Objective> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(objective.id, []),
      code: this.formBuilder.control(objective.code, [
        Validators.minLength(1),
        Validators.maxLength(64),
      ]),
      description: this.formBuilder.control(objective.description, [
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
      description: formGroup.get('description')!.value,
    };
  }
}
