import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { InspectionFinding } from '../inspection-finding';

@Injectable({
  providedIn: 'root',
})
export class InspectionFindingFormService {
  constructor(private formBuilder: FormBuilder) {}

  toFormGroup(inspectionFinding: Partial<InspectionFinding> = {}) {
    return this.formBuilder.group({
      id: this.formBuilder.control(inspectionFinding.id, []),
      code: this.formBuilder.control(inspectionFinding.code, [
        Validators.minLength(1),
        Validators.maxLength(64),
      ]),
      description: this.formBuilder.control(inspectionFinding.description, []),
      condition: this.formBuilder.control(inspectionFinding.condition, []),
      disclosedLastInspection: this.formBuilder.control(
        inspectionFinding.disclosedLastInspection,
        []
      ),
      causes: this.formBuilder.control(inspectionFinding.causes, []),
      actionPlanCategory: this.formBuilder.control(
        inspectionFinding.actionPlanCategory,
        []
      ),
      isClosed: this.formBuilder.control(inspectionFinding.isClosed, []),
      categoryId: this.formBuilder.control(inspectionFinding.categoryId, []),
      workDoneId: this.formBuilder.control(inspectionFinding.workDoneId, []),
      categoryName: this.formBuilder.control(
        inspectionFinding.categoryName,
        []
      ),
      subCategoryId: this.formBuilder.control(
        inspectionFinding.subCategoryId,
        []
      ),
      subCategoryName: this.formBuilder.control(
        inspectionFinding.subCategoryName,
        []
      ),
    });
  }

  fromFormGroup(formGroup: FormGroup) {
    return {
      id: formGroup.get('id')!.value,
      code: formGroup.get('code')!.value,
      description: formGroup.get('description')!.value,
      condition: formGroup.get('condition')!.value,
      disclosedLastInspection: formGroup.get('disclosedLastInspection')!.value,
      causes: formGroup.get('causes')!.value,
      actionPlanCategory: formGroup.get('actionPlanCategory')!.value,
      isClosed: formGroup.get('isClosed')!.value,
      categoryId: formGroup.get('categoryId')!.value,
      workDoneId: formGroup.get('workDoneId')!.value,
      categoryName: formGroup.get('categoryName')!.value,
      subCategoryId: formGroup.get('subCategoryId')!.value,
      subCategoryName: formGroup.get('subCategoryName')!.value,
    };
  }
}
