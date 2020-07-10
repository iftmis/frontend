import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Role } from '../role';

@Injectable({
  providedIn: 'root',
})
export class RoleFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(role: Partial<Role> = {}) {
    return this.formBuilder.group({
      name: this.formBuilder.control(role.name, [
        Validators.required,
        Validators.maxLength(50),
      ]),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      name: formGroup.get('name')!.value,
    };
  }
}
