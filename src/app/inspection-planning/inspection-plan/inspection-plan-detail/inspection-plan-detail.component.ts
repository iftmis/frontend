import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { InspectionPlanService } from '../inspection-plan.service';
import { InspectionPlanFormService } from './inspection-plan-form.service';
import { InspectionPlan } from '../inspection-plan';

@Component({
  selector: 'app-inspection-plan-detail',
  templateUrl: './inspection-plan-detail.component.html',
  styleUrls: ['./inspection-plan-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionPlanDetailComponent implements OnInit {
  inspectionPlan: InspectionPlan;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: InspectionPlanFormService,
    private inspectionPlanService: InspectionPlanService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ inspectionPlan }) => {
      this.inspectionPlan = inspectionPlan;
      this.form = this.formService.toFormGroup(inspectionPlan);
    });

    this.error = undefined;
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.inspectionPlanService.update(
          this.formService.fromFormGroup(this.form)
        )
      );
    } else {
      this.subscribeToResponse(
        this.inspectionPlanService.create(
          this.formService.fromFormGroup(this.form)
        )
      );
    }
  }

  private subscribeToResponse(result: Observable<InspectionPlan>) {
    result.subscribe({
      next: () => this.router.navigate(['/inspection-plans']),
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
    this.router.navigate(['/inspection-plans']);
    return false;
  }
}
