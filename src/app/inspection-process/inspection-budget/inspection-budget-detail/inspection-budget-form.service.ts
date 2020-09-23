import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { InspectionBudget } from '../inspection-budget';

@Injectable({
  providedIn: 'root',
})
export class InspectionBudgetFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(inspectionBudget: Partial<InspectionBudget> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(inspectionBudget.id, []),
      gfsCodeId: this.formBuilder.control(inspectionBudget.gfsCodeId, [
        Validators.required,
      ]),
      inspectionId: this.formBuilder.control(inspectionBudget.inspectionId, [
        Validators.required,
      ]),
      quantity: this.formBuilder.control(inspectionBudget.quantity, [
        Validators.required,
        Validators.min(0),
      ]),
      frequency: this.formBuilder.control(inspectionBudget.frequency, [
        Validators.required,
        Validators.min(0),
      ]),
      unitPrice: this.formBuilder.control(inspectionBudget.unitPrice, [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      gfsCodeId: formGroup.get('gfsCodeId')!.value,
      inspectionId: formGroup.get('inspectionId')!.value,
      quantity: formGroup.get('quantity')!.value,
      frequency: formGroup.get('frequency')!.value,
      unitPrice: formGroup.get('unitPrice')!.value,
    };
  }
}
