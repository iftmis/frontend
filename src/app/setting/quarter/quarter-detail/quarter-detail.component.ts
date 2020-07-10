import { FinancialYearService } from '../../financial-year/financial-year.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;
  financialYears: FinancialYear[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: QuarterFormService,
    private quarterService: QuarterService,
    private financialYearService: FinancialYearService,
    private titleService: Title,
    private toastService: ToastService
  ) {
    this.titleService.setTitle('Quarter Details|' + environment.app);
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
    this.isSaveOrUpdateInProgress = true;
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
        this.router.navigate(['/settings/quarters']);
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
    this.router.navigate(['/settings/quarters']);
    return false;
  }
}
