import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class UserFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(user: Partial<User> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(user.id, []),
      login: this.formBuilder.control(user.login, [Validators.required]),
      firstName: this.formBuilder.control(user.firstName, [
        Validators.required,
      ]),
      lastName: this.formBuilder.control(user.lastName, [Validators.required]),
      email: this.formBuilder.control(user.email, [
        Validators.required,
        Validators.pattern(
          '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])'
        ),
      ]),
      activated: this.formBuilder.control(user.activated, [
        Validators.required,
      ]),
      langKey: this.formBuilder.control(user.langKey, [Validators.required]),
      authorities: this.formBuilder.control(user.authorities, [
        Validators.required,
      ]),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      login: formGroup.get('login')!.value,
      firstName: formGroup.get('firstName')!.value,
      lastName: formGroup.get('lastName')!.value,
      email: formGroup.get('email')!.value,
      activated: formGroup.get('activated')!.value,
      langKey: formGroup.get('langKey')!.value,
      authorities: formGroup.get('authorities')!.value,
    };
  }
}
