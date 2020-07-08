import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { SubArea } from '../sub-area';

@Injectable({
  providedIn: 'root',
})
export class SubAreaFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(subArea: Partial<SubArea> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(subArea.id, []),
      name: this.formBuilder.control(subArea.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200),
      ]),
      areaId: this.formBuilder.control(subArea.areaId, [Validators.required]),
      areaName: this.formBuilder.control(subArea.areaName, []),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      name: formGroup.get('name')!.value,
      areaId: formGroup.get('areaId')!.value,
      areaName: formGroup.get('areaName')!.value,
    };
  }
}
