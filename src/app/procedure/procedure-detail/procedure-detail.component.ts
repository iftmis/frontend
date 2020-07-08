import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ProcedureService } from '../procedure.service';
import { ProcedureFormService } from './procedure-form.service';
import { Procedure } from '../procedure';
import { Indicator } from 'src/app/indicator/indicator';
import { IndicatorService } from 'src/app/indicator/indicator.service';

@Component({
  selector: 'app-procedure-detail',
  templateUrl: './procedure-detail.component.html',
  styleUrls: ['./procedure-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcedureDetailComponent implements OnInit {
  procedure: Procedure;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;
  indicators: Indicator[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: ProcedureFormService,
    private procedureService: ProcedureService,
    private indicatorService: IndicatorService
  ) {}

  ngOnInit() {
    this.loadIndicator();
    this.route.data.subscribe(({ procedure }) => {
      this.procedure = procedure;
      this.form = this.formService.toFormGroup(procedure);
    });

    this.error = undefined;
  }

  loadIndicator() {
    this.indicatorService.query().subscribe(resp => {
      this.indicators = resp;
    });
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.procedureService.update(this.formService.fromFormGroup(this.form))
      );
    } else {
      this.subscribeToResponse(
        this.procedureService.create(this.formService.fromFormGroup(this.form))
      );
    }
  }

  private subscribeToResponse(result: Observable<Procedure>) {
    result.subscribe({
      next: () => this.router.navigate(['/procedures']),
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
    this.router.navigate(['/procedures']);
    return false;
  }
}
