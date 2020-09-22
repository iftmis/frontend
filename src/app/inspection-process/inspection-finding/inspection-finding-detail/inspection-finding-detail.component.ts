import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { InspectionFindingService } from '../inspection-finding.service';
import { InspectionFindingFormService } from './inspection-finding-form.service';
import { InspectionFinding } from '../inspection-finding';
import { FindingCategory } from 'src/app/setting/finding-category/finding-category';
import { FindingSubCategory } from 'src/app/setting/finding-sub-category/finding-sub-category';
import { FindingCategoryService } from 'src/app/setting/finding-category/finding-category.service';
import { FindingSubCategoryService } from 'src/app/setting/finding-sub-category/finding-sub-category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-inspection-finding-detail',
  templateUrl: './inspection-finding-detail.component.html',
  styleUrls: ['./inspection-finding-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionFindingDetailComponent implements OnInit {
  form: FormGroup;
  categories: FindingCategory[] = [];
  subCategories: FindingSubCategory[] = [];
  isSaveOrUpdateInProgress = false;
  actionPlanCategoryOptions: KeyValue<string, string>[] = [
    { key: 'LOW', value: 'Low' },
    { key: 'MEDIUM', value: 'Medium' },
    { key: 'HIGH', value: 'High' },
  ];
  error: string | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: InspectionFindingFormService,
    private inspectionFindingService: InspectionFindingService,
    private categoryService: FindingCategoryService,
    private subCategoryService: FindingSubCategoryService,
    @Inject(MAT_DIALOG_DATA) public inspectionFinding: InspectionFinding,
    private dialogRef: MatDialogRef<InspectionFindingDetailComponent>
  ) {}

  ngOnInit() {
    this.categoryService.all().subscribe(res => {
      this.categories = res || [];
    });
    this.subCategoryService.all().subscribe(res => {
      this.subCategories = res || [];
    });

    this.form = this.formService.toFormGroup(this.inspectionFinding);
    this.error = undefined;
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.inspectionFindingService.update(
          this.formService.fromFormGroup(this.form)
        )
      );
    } else {
      this.subscribeToResponse(
        this.inspectionFindingService.create(
          this.formService.fromFormGroup(this.form)
        )
      );
    }
  }

  private subscribeToResponse(result: Observable<InspectionFinding>) {
    result.subscribe({
      next: () => this.dialogRef.close(result),
      error: response => {
        this.isSaveOrUpdateInProgress = false;
        this.error = response.error
          ? response.error.detail ||
            response.error.title ||
            'Internal Server Error'
          : 'Internal Server Error';
      },
      complete: () => (this.isSaveOrUpdateInProgress = false),
    });
  }

  cancel() {
    this.dialogRef.close();
    return false;
  }
}
