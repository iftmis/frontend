import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { InspectionActivitiesService } from '../inspection-activities.service';
import { InspectionActivitiesFormService } from './inspection-activities-form.service';
import { InspectionActivities } from '../inspection-activities';
import { ObjectiveService } from '../../../setting/objective/objective.service';
import { AuditableAreaService } from '../../../setting/auditable-area/auditable-area.service';
import { SubAreaService } from '../../../setting/sub-area/sub-area.service';
import { Objective } from '../../../setting/objective/objective';
import { SubArea } from '../../../setting/sub-area/sub-area';
import { AuditableArea } from '../../../setting/auditable-area/auditable-area';
import { InspectionArea } from '../../../inspection-process/preparation/inspection-area/inspection-area';
import { Risk } from '../../../risk-management/risk/risk';
import { RiskService } from '../../../risk-management/risk/risk.service';
import { MatDialogRef } from '@angular/material/dialog';

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
  riskForm: FormGroup;
  areaId: number;
  activityId: number;
  risks: BehaviorSubject<Risk[]> = new BehaviorSubject<Risk[]>([]);
  chosen: BehaviorSubject<Risk[]> = new BehaviorSubject<Risk[]>([]);

  allRisks: Risk[] = [];
  selectedRisks: Risk[] = [];
  chosenRisks: Risk[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: InspectionActivitiesFormService,
    private objectiveService: ObjectiveService,
    private auditAreasService: AuditableAreaService,
    private subAreasService: SubAreaService,
    private riskService: RiskService,
    private dialogRef: MatDialogRef<InspectionActivitiesDetailComponent>,
    private inspectionActivitiesService: InspectionActivitiesService,
    // tslint:disable-next-line:variable-name
    private _formBuilder: FormBuilder
  ) {
    // this.activityId = route.snapshot.parent?.parent?.params['id'];
  }
  // chaguliwaRisks = new Array();

  ngOnInit() {
    this.loadObjectives();
    this.loadAuditableAreas();
    // this.loadSubAreas();
    this.route.data.subscribe(({ inspectionActivities }) => {
      this.inspectionActivities = inspectionActivities;
      this.form = this.formService.toFormGroup(inspectionActivities);
    });
    this.loadRisks();

    this.error = undefined;
  }

  loadRisks() {
    // TODO get  by finacial year
    this.riskService
      .getAllByCurrentFinancialYearIdAndCurrentOrganisationUnitId()
      .subscribe(response => {
        //  this.risks.next(response);
        this.allRisks = response;
        console.log('all risk');
        console.log(this.allRisks);
        this.loadAllSelectedRisks();
      });
  }

  removeAll(risks: Risk[]) {
    // var pulled = _.pullAt(this.chosenRisks, [1, 3]);
    // console.log( Object.keys(risks));
    // this.chosenRisks.pop();
    // this.riskService.removeAll(risks).subscribe(res => this.onSuccess());

    const risksToAdd = risks.map(a => {
      console.log(a.description + ' this is being removed');

      const filteredRisks = this.chosenRisks.filter(item => item.id !== a.id);

      console.log('Filtered list is');
    });
  }

  getSelectedRisks(): Observable<Risk[]> {
    return of(this.chosenRisks);
  }

  saveAll(risk: Risk[]) {
    if (risk === undefined || risk.length === 0) {
      return;
    }

    const risksToAdd = risk.map(a => {
      console.log(a.description + ' this is being saved');

      // storing select risks in an array
      this.chosenRisks.push(a);
      for (const i of this.chosenRisks) {
        console.log('array has ' + i);
      }

      return {
        name: a.description,
        riskId: a.id,
        activityId: this.activityId,
      };
    });

    this.riskService.saveAll(risksToAdd).subscribe(res => {
      this.onSuccess();
    });
  }

  loadAllSelectedRisks() {
    this.riskService.getByActivityId(this.activityId).subscribe(res => {
      this.chosenRisks = res;
      console.log('chosen risk');
      console.log(this.chosenRisks);
      this.filterAreas(res);
    });
  }

  filterAreas(risk: any) {
    const ids = risk.map((a: any) => a.id || 0);
    console.log('ids', ids);
    // @ts-ignore
    const filtered = this.allRisks.filter((a: { id: any }) => {
      return ids.indexOf(a.id) === -1;
    });
    console.log(filtered);

    this.risks.next(filtered);
  }

  onSuccess() {
    this.loadAllSelectedRisks();
    this.selectedRisks = [];
    this.allRisks = [];
  }

  loadObjectives() {
    this.objectiveService.getAllUnPaged().subscribe(res => {
      this.objectives = res;
    });
  }

  getAllRisks(): Observable<Risk[]> {
    return this.risks.asObservable();
  }

  loadAuditableAreas() {
    this.auditAreasService.getAllUnPaged().subscribe(res => {
      this.auditableAreas = res;
    });
  }
  // loadSubAreas() {
  //   this.subAreasService.getAllUnPaged().subscribe(res => {
  //     this.subAreas = res;
  //   });
  // }

  loadSubAreas(auditableAreaId: number) {
    console.log('The id is' + auditableAreaId);
    this.subAreasService
      .getAllSubAreaByAreaId(auditableAreaId)
      .subscribe(res => {
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
    this.dialogRef.close();
  }

  filterSubAreaByArea(auditableArea: AuditableArea) {
    this.areaId = auditableArea.id as number;
    this.loadSubAreas(this.areaId);
  }
}
