import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { RiskCategoryService } from '../risk-category.service';
import { RiskCategoryFormService } from './risk-category-form.service';
import { RiskCategory } from '../risk-category';
import { ToastService } from '../../../shared/toast.service';
import { action } from 'angular-tree-component/dist/mobx-angular/mobx-proxy';

@Component({
  selector: 'app-risk-category-detail',
  templateUrl: './risk-category-detail.component.html',
  styleUrls: ['./risk-category-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskCategoryDetailComponent implements OnInit {
  riskCategory: RiskCategory;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: RiskCategoryFormService,
    private riskCategoryService: RiskCategoryService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ riskCategory }) => {
      this.riskCategory = riskCategory;
      this.form = this.formService.toFormGroup(riskCategory);
    });

    this.error = undefined;
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
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
        if (action === 'update') {
          this.toastService.success(
            'Success!',
            'Risk Category Updated Successfully'
          );
        } else {
          this.toastService.success(
            'Success!',
            'Risk Category Created Successfully'
          );
        }
        this.router.navigate(['/settings/risk-categories']);
      },
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
    this.router.navigate(['/settings/risk-categories']);
    return false;
  }
}
