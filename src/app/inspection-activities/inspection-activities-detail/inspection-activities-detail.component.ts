import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { InspectionActivitiesService } from '../inspection-activities.service';
import { InspectionActivitiesFormService } from './inspection-activities-form.service';
import { InspectionActivities } from '../inspection-activities';

@Component({
  selector: 'app-inspection-activities-detail',
  templateUrl: './inspection-activities-detail.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionActivitiesDetailComponent implements OnInit {
  inspectionActivities: InspectionActivities;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;
  subAreaIdOptions: [];
  objectiveIdOptions: [];
  auditableAreaIdOptions: [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: InspectionActivitiesFormService,
    private inspectionActivitiesService: InspectionActivitiesService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ inspectionActivities }) => {
      this.inspectionActivities = inspectionActivities;
      this.form = this.formService.toFormGroup(inspectionActivities);
    });

    this.error = undefined;
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.inspectionActivitiesService.update(
          this.formService.fromFormGroup(this.form)
        ),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.inspectionActivitiesService.create(
          this.formService.fromFormGroup(this.form)
        ),
        'create'
      );
    }
  }

  private subscribeToResponse(
    result: Observable<InspectionActivities>,
    action: string
  ) {
    result.subscribe({
      next: () => this.router.navigate(['/inspection-activities']),
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
    this.router.navigate(['/inspection-activities']);
    return false;
  }
}
