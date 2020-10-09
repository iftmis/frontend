import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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

import { RiskCategoryService } from '../risk-category.service';
import { RiskCategoryFormService } from './risk-category-form.service';
import { RiskCategory } from '../risk-category';
import { ToastService } from '../../../shared/toast.service';

@Component({
  selector: 'app-risk-category-detail',
  templateUrl: './risk-category-detail.component.html',
  styleUrls: ['./risk-category-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskCategoryDetailComponent implements OnInit {
  riskCategory: RiskCategory;
  form: FormGroup;

  public error: string | undefined = undefined;

  public title: string;
  public action: string;
  public label: string;
  public showProgress: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: RiskCategoryFormService,
    private riskCategoryService: RiskCategoryService,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RiskCategoryDetailComponent>
  ) {
    this.title = data.title;
    this.action = data.action;
    this.label = data.label;

    this.showProgress = false;
  }

  ngOnInit() {
    this.route.data.subscribe(({ riskCategory }) => {
      this.riskCategory = riskCategory;
      this.form = this.formService.toFormGroup(riskCategory);
    });

    this.error = undefined;
  }

  saveOrUpdate() {
    this.showProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.riskCategoryService.update(
          this.formService.fromFormGroup(this.form)
        ),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.riskCategoryService.create(
          this.formService.fromFormGroup(this.form)
        ),
        'create'
      );
    }
  }

  private subscribeToResponse(
    result: Observable<RiskCategory>,
    action: string
  ) {
    result.subscribe({
      next: () => {
        if (action === 'create') {
          this.toastService.success(
            'Success!',
            'Risk Category Created Successfully!'
          );
        } else {
          this.toastService.success(
            'Success!',
            'Risk Category Updated Successfully!'
          );
        }
        this.dialogRef.close({ success: true });
      },
      error: response => {
        this.showProgress = false;
        this.error = response.error
          ? response.error.detail ||
            response.error.title ||
            'Internal Server Error'
          : 'Internal Server Error';
      },
      complete: () => (this.showProgress = false),
    });
  }

  cancel() {
    this.router.navigate(['/settings/risk-categories']);
    return false;
  }
}
