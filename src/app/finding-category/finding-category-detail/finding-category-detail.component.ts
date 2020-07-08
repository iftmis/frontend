import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { FindingCategoryService } from '../finding-category.service';
import { FindingCategoryFormService } from './finding-category-form.service';
import { FindingCategory } from '../finding-category';
import { environment } from '../../../environments/environment';
import { Title } from '@angular/platform-browser';

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
    private titleService: Title
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
        )
      );
    } else {
      this.subscribeToResponse(
        this.findingCategoryService.create(
          this.formService.fromFormGroup(this.form)
        )
      );
    }
  }

  private subscribeToResponse(result: Observable<FindingCategory>) {
    result.subscribe({
      next: () => this.router.navigate(['/finding-categorys']),
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
    this.router.navigate(['/finding-categorys']);
    return false;
  }
}
