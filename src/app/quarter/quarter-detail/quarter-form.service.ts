import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Quarter } from '../quarter';

@Injectable({
  providedIn: 'root',
})
export class QuarterFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(quarter: Partial<Quarter> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(quarter.id, []),
      code: this.formBuilder.control(quarter.code, [
        Validators.minLength(1),
        Validators.maxLength(64),
      ]),
      name: this.formBuilder.control(quarter.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200),
      ]),
      startDate: this.formBuilder.control(quarter.startDate, [
        Validators.required,
      ]),
      endDate: this.formBuilder.control(quarter.endDate, [Validators.required]),
      financialYearId: this.formBuilder.control(quarter.financialYearId, [
        Validators.required,
      ]),
      financialYearName: this.formBuilder.control(
        quarter.financialYearName,
        []
      ),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      code: formGroup.get('code')!.value,
      name: formGroup.get('name')!.value,
      startDate: formGroup.get('startDate')!.value,
      endDate: formGroup.get('endDate')!.value,
      financialYearId: formGroup.get('financialYearId')!.value,
      financialYearName: formGroup.get('financialYearName')!.value,
    };
  }
}
