import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  public showProgress: boolean;
  error: string | undefined = undefined;

  public title: string;
  public label: string;
  public action: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: FindingCategoryFormService,
    private findingCategoryService: FindingCategoryService,
    private titleService: Title,
    private toastService: ToastService,
    private _dialogRef: MatDialogRef<FindingCategoryDetailComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.action = data.action;
    this.label = data.label;
    this.showProgress = false;

    if (this.action === 'update') {
      this.findingCategory = data.row;
    }
  }

  ngOnInit() {
    // this.route.data.subscribe(({ findingCategory }) => {
    //   this.findingCategory = findingCategory;
    //   this.form = this.formService.toFormGroup(findingCategory);
    // });
    this.form = this.initform();
    this.error = undefined;
  }

  private initform(): FormGroup {
    if (this.action === 'update') {
      return this._formBuilder.group({
        id: [this.findingCategory.id],
        code: [this.findingCategory.code],
        name: [this.findingCategory.name],
      });
    } else {
      return this._formBuilder.group({
        id: [''],
        code: ['', Validators.required],
        name: ['', Validators.required],
      });
    }
  }

  saveOrUpdate() {
    this.showProgress = true;
    this.error = undefined;
    if (this.action === 'update') {
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
        // this.router.navigate(['/main/settings/finding-categories']);
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
    this.router.navigate(['/main/settings/finding-categories']);
    return false;
  }
}
