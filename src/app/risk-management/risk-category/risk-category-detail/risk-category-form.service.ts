import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { RiskCategory } from '../risk-category';

@Injectable({
  providedIn: 'root',
})
export class RiskCategoryFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(riskCategory: Partial<RiskCategory> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(riskCategory.id, []),
      code: this.formBuilder.control(riskCategory.code, [Validators.required]),
      description: this.formBuilder.control(riskCategory.description, [
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
