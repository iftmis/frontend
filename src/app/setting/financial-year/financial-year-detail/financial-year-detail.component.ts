import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DatePipe, KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { FinancialYearService } from '../financial-year.service';
import { FinancialYearFormService } from './financial-year-form.service';
import { FinancialYear } from '../financial-year';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '../../../shared/date-input-format';
import { ToastService } from '../../../shared/toast.service';

@Component({
  selector: 'app-financial-year-detail',
  templateUrl: './financial-year-detail.component.html',
  styleUrls: ['./financial-year-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DatePipe,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class FinancialYearDetailComponent implements OnInit {
  financialYear: FinancialYear;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: FinancialYearFormService,
    private financialYearService: FinancialYearService,
    private titleService: Title,
    private datePipe: DatePipe,
    private toastService: ToastService
  ) {
    this.titleService.setTitle('Financial Year Details|' + environment.app);
  }

  ngOnInit() {
    this.route.data.subscribe(({ financialYear }) => {
      this.financialYear = financialYear;
      this.form = this.formService.toFormGroup(financialYear);
    });

    this.error = undefined;
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.financialYearService.update(
          this.formService.fromFormGroup(this.form)
        ),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.financialYearService.create(
          this.formService.fromFormGroup(this.form)
        ),
        'create'
      );
    }
  }

  private subscribeToResponse(
    result: Observable<FinancialYear>,
    action: string
  ) {
    result.subscribe({
      next: () => {
        if (action === 'update') {
          this.toastService.success(
            'Success!',
            'Financial Year Updated Successfully'
          );
        } else {
          this.toastService.success(
            'Success!',
            'Financial Year Created Successfully'
          );
        }
        this.router.navigate(['/settings/financial-years']);
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
    this.router.navigate(['/settings/financial-years']);
    return false;
  }
}
