import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { RiskRank } from '../risk-rank';

@Injectable({
  providedIn: 'root',
})
export class RiskRankFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(riskRank: Partial<RiskRank> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(riskRank.id, []),
      name: this.formBuilder.control(riskRank.name, [Validators.required]),
      minValue: this.formBuilder.control(riskRank.minValue, [
        Validators.required,
      ]),
      maxValue: this.formBuilder.control(riskRank.maxValue, [
        Validators.required,
      ]),
      hexColor: this.formBuilder.control(riskRank.hexColor, [
        Validators.minLength(4),
        Validators.maxLength(7),
      ]),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      name: formGroup.get('name')!.value,
      minValue: formGroup.get('minValue')!.value,
      maxValue: formGroup.get('maxValue')!.value,
      hexColor: formGroup.get('hexColor')!.value,
    };
  }
}
