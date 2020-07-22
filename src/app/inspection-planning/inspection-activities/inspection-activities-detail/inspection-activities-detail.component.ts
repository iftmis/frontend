import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { InspectionActivitiesService } from '../inspection-activities.service';
import { InspectionActivitiesFormService } from './inspection-activities-form.service';
import { InspectionActivities } from '../inspection-activities';
import { ObjectiveService } from '../../../setting/objective/objective.service';
import { AuditableAreaService } from '../../../setting/auditable-area/auditable-area.service';
import { SubAreaService } from '../../../setting/sub-area/sub-area.service';
import { Objective } from '../../../setting/objective/objective';
import { SubArea } from '../../../setting/sub-area/sub-area';
import { AuditableArea } from '../../../setting/auditable-area/auditable-area';

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
  subAreas: SubArea[];
  objectives: Objective[];
  auditableAreas: AuditableArea[];
  isLinear: true;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  xxxxxFormGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: InspectionActivitiesFormService,
    private objectiveService: ObjectiveService,
    private auditAreasService: AuditableAreaService,
    private subAreasService: SubAreaService,
    private inspectionActivitiesService: InspectionActivitiesService,
    // tslint:disable-next-line:variable-name
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loadObjectives();
    this.loadAuditableAreas();
    this.loadSubAreas();
    this.route.data.subscribe(({ inspectionActivities }) => {
      this.inspectionActivities = inspectionActivities;
      this.form = this.formService.toFormGroup(inspectionActivities);
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

    this.fourthFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

    this.error = undefined;
  }

  loadObjectives() {
    this.objectiveService.getAllUnPaged().subscribe(res => {
      this.objectives = res;
    });
  }
  loadAuditableAreas() {
    this.auditAreasService.getAllUnPaged().subscribe(res => {
      this.auditableAreas = res;
    });
  }
  loadSubAreas() {
    this.subAreasService.getAllUnPaged().subscribe(res => {
      this.subAreas = res;
    });
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
      next: () =>
        this.router.navigate(['/inspection-planning/inspection-activities']),
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
    this.router.navigate(['/inspection-planning/inspection-activities']);
    return false;
  }
}
