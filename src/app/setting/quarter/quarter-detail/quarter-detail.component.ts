import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FinancialYearService } from '../../financial-year/financial-year.service';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { QuarterService } from '../quarter.service';
import { QuarterFormService } from './quarter-form.service';
import { Quarter } from '../quarter';
import { FinancialYear } from '../../financial-year/financial-year';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { HttpResponse } from '@angular/common/http';
import { ToastService } from '../../../shared/toast.service';

@Component({
  selector: 'app-quarter-detail',
  templateUrl: './quarter-detail.component.html',
  styleUrls: ['./quarter-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuarterDetailComponent implements OnInit {
  quarter: Quarter;
  form: FormGroup;
  public showProgress: boolean;
  error: string | undefined = undefined;
  financialYears: FinancialYear[];

  public title: string;
  public action: string;
  public label: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: QuarterFormService,
    private quarterService: QuarterService,
    private financialYearService: FinancialYearService,
    private titleService: Title,
    private toastService: ToastService,
    private _dialogRef: MatDialogRef<QuarterDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.titleService.setTitle('Quarter Details | ' + environment.app);
    this.title = data.title;
    this.action = data.action;
    this.label = data.label;
    this.showProgress = false;
  }

  ngOnInit() {
    this.loadFinancialYear();

    this.route.data.subscribe(({ quarter }) => {
      this.quarter = quarter;
      this.form = this.formService.toFormGroup(quarter);
    });

    this.error = undefined;
  }

  loadFinancialYear() {
    this.financialYearService.getAllUnPaged().subscribe(res => {
      this.financialYears = res;
    });
  }

  saveOrUpdate() {
    this.showProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.quarterService.update(this.formService.fromFormGroup(this.form)),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.quarterService.create(this.formService.fromFormGroup(this.form)),
        'create'
      );
    }
  }

  private subscribeToResponse(result: Observable<Quarter>, action: string) {
    result.subscribe({
      next: () => {
        if (action === 'update') {
          this.toastService.success('Success!', 'Quarter Updated Successfully');
        } else {
          this.toastService.success(
            'Success!',
            'Quarter Initiated Successfully'
          );
        }
        // this.router.navigate(['/main/settings/quarters']);
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
    this.router.navigate(['/main/settings/quarters']);
    return false;
  }
}
