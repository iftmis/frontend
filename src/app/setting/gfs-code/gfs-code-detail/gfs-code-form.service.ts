import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { GfsCode } from '../gfs-code';

@Injectable({
  providedIn: 'root',
})
export class GfsCodeFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(gfsCode: Partial<GfsCode> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(gfsCode.id, []),
      code: this.formBuilder.control(gfsCode.code, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(64),
      ]),
      description: this.formBuilder.control(gfsCode.description, [
        Validators.required,
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
