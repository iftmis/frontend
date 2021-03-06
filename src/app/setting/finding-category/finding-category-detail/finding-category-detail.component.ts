import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { FindingCategoryService } from '../finding-category.service';
import { FindingCategoryFormService } from './finding-category-form.service';
import { FindingCategory } from '../finding-category';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { ToastService } from '../../../shared/toast.service';

@Component({
  selector: 'app-finding-category-detail',
  templateUrl: './finding-category-detail.component.html',
  styleUrls: ['./finding-category-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindingCategoryDetailComponent implements OnInit {
  findingCategory: FindingCategory;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: FindingCategoryFormService,
    private findingCategoryService: FindingCategoryService,
    private titleService: Title,
    private toastService: ToastService
  ) {
    this.titleService.setTitle('Finding Category Details|' + environment.app);
  }

  ngOnInit() {
    this.route.data.subscribe(({ findingCategory }) => {
      this.findingCategory = findingCategory;
      this.form = this.formService.toFormGroup(findingCategory);
    });

    this.error = undefined;
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.findingCategoryService.update(
          this.formService.fromFormGroup(this.form)
        ),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.findingCategoryService.create(
          this.formService.fromFormGroup(this.form)
        ),
        'create'
      );
    }
  }

  private subscribeToResponse(
    result: Observable<FindingCategory>,
    action: string
  ) {
    result.subscribe({
      next: () => {
        if (action === 'update') {
          this.toastService.success(
            'Success!',
            'Finding Category Updated Successfully'
          );
        } else {
          this.toastService.success(
            'Success!',
            'Finding Category Created Successfully'
          );
        }
        this.router.navigate(['/settings/finding-categories']);
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
    this.router.navigate(['/settings/finding-categories']);
    return false;
  }
}
