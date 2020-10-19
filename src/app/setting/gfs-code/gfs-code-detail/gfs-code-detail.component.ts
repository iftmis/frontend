import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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

import { GfsCodeService } from '../gfs-code.service';
import { GfsCodeFormService } from './gfs-code-form.service';
import { GfsCode } from '../gfs-code';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { ToastService } from '../../../shared/toast.service';

@Component({
  selector: 'app-gfs-code-detail',
  templateUrl: './gfs-code-detail.component.html',
  styleUrls: ['./gfs-code-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GfsCodeDetailComponent implements OnInit {
  gfsCode: GfsCode;
  form: FormGroup;
  public showProgress: boolean;
  error: string | undefined = undefined;

  public title: string;
  public action: string;
  public label: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: GfsCodeFormService,
    private gfsCodeService: GfsCodeService,
    private titleService: Title,
    private toastService: ToastService,
    private _dialogRef: MatDialogRef<GfsCodeDetailComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.titleService.setTitle('GFS Code Details | ' + environment.app);
    this.showProgress = false;
    this.title = data.title;
    this.label = data.label;
    this.action = data.action;

    if (this.action === 'update') {
      this.gfsCode = data.row;
    }
  }

  ngOnInit() {
    // this.route.data.subscribe(({ gfsCode }) => {
    //   this.gfsCode = gfsCode;
    //   this.form = this.formService.toFormGroup(gfsCode);
    // });
    this.form = this.initform();
    this.error = undefined;
  }

  private initform(): FormGroup {
    if (this.action === 'update') {
      return this._formBuilder.group({
        id: [this.gfsCode.id],
        code: [this.gfsCode.code],
        description: [this.gfsCode.description],
      });
    } else {
      return this._formBuilder.group({
        id: [''],
        code: ['', Validators.required],
        description: ['', Validators.required],
      });
    }
  }

  saveOrUpdate() {
    this.showProgress = true;
    this.error = undefined;
    if (this.action === 'update') {
      this.subscribeToResponse(
        this.gfsCodeService.update(this.formService.fromFormGroup(this.form)),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.gfsCodeService.create(this.formService.fromFormGroup(this.form)),
        'create'
      );
    }
  }

  private subscribeToResponse(result: Observable<GfsCode>, action: string) {
    result.subscribe({
      next: () => {
        if (action === 'update') {
          this.toastService.success(
            'Success!',
            'GFS Code Updated Successfully'
          );
        } else {
          this.toastService.success(
            'Success!',
            'GFS Code Created Successfully'
          );
        }
        // this.router.navigate(['/main/settings/gfs-codes']);
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
    this.router.navigate(['/main/settings/gfs-codes']);
    return false;
  }
}
