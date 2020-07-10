import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { PasswordReset, User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(passwordReset: Partial<PasswordReset> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(passwordReset.id, []),
      password: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      passwordConfirmation: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      password: formGroup.get('password')!.value,
      passwordConfirmation: formGroup.get('passwordConfirmation')!.value,
    };
  }
}
