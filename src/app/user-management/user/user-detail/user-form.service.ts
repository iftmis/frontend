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
      email: this.formBuilder.control(user.email, [Validators.required]),
      activated: this.formBuilder.control(user.activated, [
        Validators.required,
      ]),
      langKey: this.formBuilder.control(user.langKey, [Validators.required]),
      authorities: this.formBuilder.control(user.authorities, []),
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
