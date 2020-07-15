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
      riskRegisterId: this.formBuilder.control(risk.riskRegisterId, [
        Validators.required,
      ]),
      riskRegisterName: this.formBuilder.control(risk.riskRegisterName, []),
      objectiveId: this.formBuilder.control(risk.objectiveId, [
        Validators.required,
      ]),
      objectiveDescription: this.formBuilder.control(
        risk.objectiveDescription,
        []
      ),
      riskCategoryId: this.formBuilder.control(risk.riskCategoryId, [
        Validators.required,
      ]),
      riskCategoryName: this.formBuilder.control(risk.riskCategoryName, []),
      riskOwnerId: this.formBuilder.control(risk.riskOwnerId, [
        Validators.required,
      ]),
      riskOwnerName: this.formBuilder.control(risk.riskOwnerName, []),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      code: formGroup.get('code')!.value,
      description: formGroup.get('description')!.value,
      riskRegisterId: formGroup.get('riskRegisterId')!.value,
      riskRegisterName: formGroup.get('riskRegisterName')!.value,
      objectiveId: formGroup.get('objectiveId')!.value,
      objectiveDescription: formGroup.get('objectiveDescription')!.value,
      riskCategoryId: formGroup.get('riskCategoryId')!.value,
      riskCategoryName: formGroup.get('riskCategoryName')!.value,
      riskOwnerId: formGroup.get('riskOwnerId')!.value,
      riskOwnerName: formGroup.get('riskOwnerName')!.value,
    };
  }
}
