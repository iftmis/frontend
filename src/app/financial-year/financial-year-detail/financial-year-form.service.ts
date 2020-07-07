import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { FinancialYear } from '../financial-year';

@Injectable({
  providedIn: 'root',
})
export class FinancialYearFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(financialYear: Partial<FinancialYear> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(financialYear.id, []),
      name: this.formBuilder.control(financialYear.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200),
      ]),
      startDate: this.formBuilder.control(financialYear.startDate, [
        Validators.required,
      ]),
      endDate: this.formBuilder.control(financialYear.endDate, [
        Validators.required,
      ]),
      isOpened: this.formBuilder.control(financialYear.isOpened, [
        Validators.required,
      ]),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      name: formGroup.get('name')!.value,
      startDate: formGroup.get('startDate')!.value,
      endDate: formGroup.get('endDate')!.value,
      isOpened: formGroup.get('isOpened')!.value,
    };
  }
}
