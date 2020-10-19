import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { FindingSubCategoryService } from '../finding-sub-category.service';
import { FindingSubCategoryFormService } from './finding-sub-category-form.service';
import { FindingSubCategory } from '../finding-sub-category';
import { ToastService } from '../../../shared/toast.service';
import { AuditableArea } from '../../auditable-area/auditable-area';
import { FindingCategory } from '../../finding-category/finding-category';
import { FindingCategoryService } from '../../finding-category/finding-category.service';

@Component({
  selector: 'app-finding-sub-category-detail',
  templateUrl: './finding-sub-category-detail.component.html',
  styleUrls: ['./finding-sub-category-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindingSubCategoryDetailComponent implements OnInit {
  findingSubCategory: FindingSubCategory;
  form: FormGroup;
  error: string | undefined = undefined;

  public showProgress: boolean;
  public title: string;
  public action: string;
  public label: string;
  findingCategories: FindingCategory[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: FindingSubCategoryFormService,
    private findingSubCategoryService: FindingSubCategoryService,
    private findingCategoryService: FindingCategoryService,
    private toastService: ToastService,
    private _dialogRef: MatDialogRef<FindingSubCategoryDetailComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.action = data.action;
    this.label = data.label;
    if (this.action === 'update') {
      this.findingSubCategory = data.row;
    }
    this.showProgress = false;
  }

  ngOnInit() {
    this.loadFindingCategories();
    // this.route.data.subscribe(({ findingSubCategory }) => {
    //   this.findingSubCategory = findingSubCategory;
    //   this.form = this.formService.toFormGroup(findingSubCategory);
    // });
    this.form = this.initform();
    this.error = undefined;
  }

  private initform(): FormGroup {
    if (this.action === 'update') {
      return this._formBuilder.group({
        id: [this.findingSubCategory.id],
        code: [this.findingSubCategory.code],
        name: [this.findingSubCategory.name],
        findingCategoryId: [this.findingSubCategory.findingCategoryId],
      });
    } else {
      return this._formBuilder.group({
        id: [''],
        code: ['', Validators.required],
        name: ['', Validators.required],
        findingCategoryId: ['', Validators.required],
      });
    }
  }

  loadFindingCategories() {
    this.findingCategoryService.all().subscribe(resp => {
      // @ts-ignore
      this.findingCategories = resp.content || [];
    });
  }

  saveOrUpdate() {
    this.showProgress = true;
    this.error = undefined;
    if (this.action === 'update') {
      this.subscribeToResponse(
        this.findingSubCategoryService.update(
          // @ts-ignore
          this.formService.fromFormGroup(this.form)
        ),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.findingSubCategoryService.create(
          // @ts-ignore
          this.formService.fromFormGroup(this.form)
        ),
        'create'
      );
    }
  }

  private subscribeToResponse(
    result: Observable<FindingSubCategory>,
    action: string
  ) {
    result.subscribe({
      next: () => {
        if (action === 'update') {
          this.toastService.success(
            'Success!',
            'Finding Sub-Category Updated Successfully'
          );
        } else {
          this.toastService.success(
            'Success!',
            'Finding Sub-Category Created Successfully'
          );
        }
        // this.router.navigate(['/main/settings/finding-sub-categories']);
        this._dialogRef.close({ success: true });
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
    this.router.navigate(['/main/settings/finding-sub-categories']);
    return false;
  }
}
