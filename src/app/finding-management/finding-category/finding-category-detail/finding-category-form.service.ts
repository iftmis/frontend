import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { FindingCategory } from '../finding-category';

@Injectable({
  providedIn: 'root',
})
export class FindingCategoryFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(findingCategory: Partial<FindingCategory> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(findingCategory.id, []),
      code: this.formBuilder.control(findingCategory.code, [
        Validators.minLength(1),
        Validators.maxLength(64),
      ]),
      name: this.formBuilder.control(findingCategory.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200),
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
