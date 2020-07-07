import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { FinancialYearService } from '../financial-year.service';
import { FinancialYearFormService } from './financial-year-form.service';
import { FinancialYear } from '../financial-year';

@Component({
  selector: 'app-financial-year-detail',
  templateUrl: './financial-year-detail.component.html',
  styleUrls: ['./financial-year-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    private financialYearService: FinancialYearService
  ) {}

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
        )
      );
    } else {
      this.subscribeToResponse(
        this.financialYearService.create(
          this.formService.fromFormGroup(this.form)
        )
      );
    }
  }

  private subscribeToResponse(result: Observable<FinancialYear>) {
    result.subscribe({
      next: () => this.router.navigate(['/financial-years']),
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
    this.router.navigate(['/financial-years']);
    return false;
  }
}
