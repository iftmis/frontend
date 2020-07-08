import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { FindingSubCategoryService } from '../finding-sub-category.service';
import { FindingSubCategoryFormService } from './finding-sub-category-form.service';
import { FindingSubCategory } from '../finding-sub-category';

@Component({
  selector: 'app-finding-sub-category-detail',
  templateUrl: './finding-sub-category-detail.component.html',
  styleUrls: ['./finding-sub-category-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindingSubCategoryDetailComponent implements OnInit {
  findingSubCategory: FindingSubCategory;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: FindingSubCategoryFormService,
    private findingSubCategoryService: FindingSubCategoryService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ findingSubCategory }) => {
      this.findingSubCategory = findingSubCategory;
      this.form = this.formService.toFormGroup(findingSubCategory);
    });

    this.error = undefined;
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.findingSubCategoryService.update(
          this.formService.fromFormGroup(this.form)
        )
      );
    } else {
      this.subscribeToResponse(
        this.findingSubCategoryService.create(
          this.formService.fromFormGroup(this.form)
        )
      );
    }
  }

  private subscribeToResponse(result: Observable<FindingSubCategory>) {
    result.subscribe({
      next: () => this.router.navigate(['/finding-sub-categorys']),
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
    this.router.navigate(['/finding-sub-categorys']);
    return false;
  }
}
