import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { FindingSubCategory } from '../finding-sub-category';

@Injectable({
  providedIn: 'root',
})
export class FindingSubCategoryFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(findingSubCategory: Partial<FindingSubCategory> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(findingSubCategory.id, []),
      code: this.formBuilder.control(findingSubCategory.code, [
        Validators.minLength(1),
        Validators.maxLength(64),
      ]),
      name: this.formBuilder.control(findingSubCategory.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200),
      ]),
      findingCategoryId: this.formBuilder.control(
        findingSubCategory.findingCategoryId
      ),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      code: formGroup.get('code')!.value,
      name: formGroup.get('name')!.value,
      findingCategoryId: formGroup.get('findingCategoryId')!.value,
    };
  }
}
