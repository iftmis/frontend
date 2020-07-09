import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Indicator } from '../indicator';

@Injectable({
  providedIn: 'root',
})
export class IndicatorFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(indicator: Partial<Indicator> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(indicator.id, []),
      subAreaId: this.formBuilder.control(indicator.subAreaId, [
        Validators.required,
      ]),
      subAreaName: this.formBuilder.control(indicator.subAreaName, []),
      name: this.formBuilder.control(indicator.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200),
      ]),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      subAreaId: formGroup.get('subAreaId')!.value,
      subAreaName: formGroup.get('subAreaName')!.value,
      name: formGroup.get('name')!.value,
    };
  }
}
