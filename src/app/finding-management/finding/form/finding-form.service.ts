import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Finding } from '../finding';

@Injectable({
  providedIn: 'root',
})
export class FindingFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(risk: Partial<Finding> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(risk.id, []),
      code: this.formBuilder.control(risk.code, [Validators.required]),
      description: this.formBuilder.control(risk.description, [
        Validators.required,
      ]),
      actionPlanCategory: this.formBuilder.control(risk.actionPlanCategory, [
        Validators.required,
      ]),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      code: formGroup.get('code')!.value,
      description: formGroup.get('description')!.value,
      actionPlanCategory: formGroup.get('actionPlanCategory')!.value,
    };
  }
}
