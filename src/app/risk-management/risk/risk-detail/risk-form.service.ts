import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Risk } from '../risk';

@Injectable({
  providedIn: 'root',
})
export class RiskFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(risk: Partial<Risk> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(risk.id, []),
      code: this.formBuilder.control(risk.code, [Validators.required]),
      description: this.formBuilder.control(risk.description, [
        Validators.required,
      ]),
      objectiveId: this.formBuilder.control(risk.objectiveId, [
        Validators.required,
      ]),
      riskCategoryId: this.formBuilder.control(risk.riskCategoryId, [
        Validators.required,
      ]),
      /*riskOwnerId: this.formBuilder.control(risk.riskOwnerId, [
        Validators.required,
      ])*/
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      code: formGroup.get('code')!.value,
      description: formGroup.get('description')!.value,
      /*riskRegisterId: formGroup.get('riskRegisterId')!.value,*/
      objectiveId: formGroup.get('objectiveId')!.value,
      riskCategoryId: formGroup.get('riskCategoryId')!.value,
      /*riskOwnerId: formGroup.get('riskOwnerId')!.value,*/
    };
  }
}
