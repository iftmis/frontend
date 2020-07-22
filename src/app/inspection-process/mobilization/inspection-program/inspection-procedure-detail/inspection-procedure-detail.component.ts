import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { InspectionProcedureService } from '../inspection-procedure.service';
import { InspectionProcedureFormService } from './inspection-procedure-form.service';
import { InspectionProcedure } from '../inspection-procedure';

@Component({
  selector: 'app-inspection-procedure-detail',
  templateUrl: './inspection-procedure-detail.component.html',
  styleUrls: ['./inspection-procedure-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionProcedureDetailComponent implements OnInit {
  inspectionProcedure: InspectionProcedure;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: InspectionProcedureFormService,
    private inspectionProcedureService: InspectionProcedureService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ inspectionProcedure }) => {
      this.inspectionProcedure = inspectionProcedure;
      this.form = this.formService.toFormGroup(inspectionProcedure);
    });

    this.error = undefined;
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.inspectionProcedureService.update(
          this.formService.fromFormGroup(this.form)
        )
      );
    } else {
      this.subscribeToResponse(
        this.inspectionProcedureService.create(
          this.formService.fromFormGroup(this.form)
        )
      );
    }
  }

  private subscribeToResponse(result: Observable<InspectionProcedure>) {
    result.subscribe({
      next: () => this.router.navigate(['/inspection-procedures']),
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
    this.router.navigate(['/inspection-procedures']);
    return false;
  }
}
