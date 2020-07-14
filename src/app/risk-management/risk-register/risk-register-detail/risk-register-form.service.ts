import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { RiskRegister } from '../risk-register';

@Injectable({
  providedIn: 'root',
})
export class RiskRegisterFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(riskRegister: Partial<RiskRegister> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(riskRegister.id, []),
      name: this.formBuilder.control(riskRegister.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(500),
      ]),
      financialYear: this.formBuilder.control(riskRegister.financialYear, [
        Validators.required,
      ]),
      organisationUnit: this.formBuilder.control(
        riskRegister.organisationUnit,
        [Validators.required]
      ),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      name: formGroup.get('name')!.value,
      financialYear: formGroup.get('financialYear')!.value,
      organisationUnit: formGroup.get('organisationUnit')!.value,
    };
  }
}
