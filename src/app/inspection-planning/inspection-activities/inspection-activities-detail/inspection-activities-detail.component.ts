import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
import { ThemePalette } from '@angular/material/core';
import { OrganisationUnitService } from '../../../setting/organisation-unit/organisation-unit.service';
import { OrganisationUnit } from '../../../setting/organisation-unit/organisation-unit';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../user-management/user/user';
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-inspection-activities-detail',
  templateUrl: './inspection-activities-detail.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionActivitiesDetailComponent implements OnInit {
  interestFormGroup: FormGroup;
  organisationUnitFormGroup: FormGroup;
  selected: any;
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
  organisationUnit: BehaviorSubject<OrganisationUnit[]> = new BehaviorSubject<
    OrganisationUnit[]
  >([]);

  auditableAreaSubject: BehaviorSubject<Risk[]> = new BehaviorSubject<Risk[]>(
    []
  );

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
    private organisationUnitService: OrganisationUnitService,
    private dialogRef: MatDialogRef<InspectionActivitiesDetailComponent>,
    private inspectionActivitiesService: InspectionActivitiesService,
    // tslint:disable-next-line:variable-name
    private _formBuilder: FormBuilder,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar
  ) {
    this.form = this._formBuilder.group({
      checkArray: this._formBuilder.array([], [Validators.required]),
    });
    // this.activityId = route.snapshot.parent?.parent?.params['id'];
  }
  // chaguliwaRisks = new Array();

  ngOnInit() {
    this.loadObjectives();
    this.loadAuditableAreas();
    // this.loadSubAreas();
    this.loadOrganisationUnits();
    this.route.data.subscribe(({ inspectionActivities }) => {
      this.inspectionActivities = inspectionActivities;
      this.form = this.formService.toFormGroup(inspectionActivities);
    });
    this.loadRisks();

    this.error = undefined;

    this.interestFormGroup = this._formBuilder.group({
      risks: this._formBuilder.array([]),
    });

    this.organisationUnitFormGroup = this._formBuilder.group({
      organisationUnit: this._formBuilder.array([]),
    });
  }

  loadRisks() {
    // TODO get  by financial year
    this.riskService.getAllByCurrentFinancialYearId().subscribe(response => {
      this.risks.next(response);
      // this.allRisks = response;

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
      console.log(a.description + ' this is being removed ');

      const filteredRisks = this.chosenRisks.filter(item => item.id !== a.id);

      this.risks.next(filteredRisks);

      console.log('Filtered list is  ' + filteredRisks);
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
      console.log(a.description + ' This is being saved');

      // storing select risks in an array
      this.chosenRisks.push(a);
      for (const i of this.chosenRisks) {
        console.log('array has ' + i);
      }

      // remove item from all risks
      this.filterAreas(risk);

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
      this.risks.next(res);
      console.log('chosen risk');
      console.log(this.chosenRisks);
      this.filterAreas(res);
    });
  }

  filterAreas(risk: any) {
    const ids = risk.map((a: any) => a.id || 0);
    console.log('ids', ids);
    // @ts-ignore
    const filtered = this.risks.filter((a: { id: any }) => {
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

  onChange(event: any) {
    const interests = (this.interestFormGroup.get(
      'risks'
    ) as FormArray) as FormArray;
    console.log(' showa ' + interests);
    if (event.checked) {
      interests.push(new FormControl(event.source.value));
    } else {
      const i = interests.controls.findIndex(
        x => x.value === event.source.value
      );
      interests.removeAt(i);
    }
  }
  onOrganisationUnitChange(eventOrganisationUnit: any) {
    const organisation = (this.organisationUnitFormGroup.get(
      'organisationUnit'
    ) as FormArray) as FormArray;
    console.log(' showa ' + organisation);
    if (eventOrganisationUnit.checked) {
      organisation.push(new FormControl(eventOrganisationUnit.source.value));
    } else {
      const i = organisation.controls.findIndex(
        x => x.value === eventOrganisationUnit.source.value
      );
      organisation.removeAt(i);
    }
  }

  submit() {}

  save() {
    console.log(this.interestFormGroup.value);
    const selectedOrganisationUnits = this.organisationUnitFormGroup.value
      .organisationUnit;
    const selectedRisks = this.interestFormGroup.value.risks;
    //
    // if (_.size(selectedOrganisationUnits) < 1) {
    //   // throw error in the radio button
    //   this.openSnackBar("Please place your selected Organisation Unit", "OK");
    //
    //
    // } else if (_.size(selectedRisks) < 1) {
    //   // throw error in radio button
    //   this.openSnackBar("Please place your selected Risks", "OK");
    //
    // }
    //

    {
      // if they are filled then upload
      console.log('' + this.organisationUnitFormGroup.value);

      this.inspectionActivities = {
        activity: this.form.value.activity,
        auditableAreaId: this.form.value.auditableAreaId,
        days: this.form.value.days,
        objectiveId: this.form.value.objectiveId,
        organisationUnit: selectedOrganisationUnits,
        quarter1: this.form.value.quarter1,
        quarter2: this.form.value.quarter2,
        quarter3: this.form.value.quarter3,
        quarter4: this.form.value.quarter4,
        risk: selectedRisks,
        subAreaId: this.form.value.subAreaId,
      };
      this.inspectionActivitiesService
        .create(this.inspectionActivities)
        .subscribe(res => {
          // show the results
          console.log('Inspection activity : ' + res);

          this.subscribeToResponseAfterCreating(
            this.inspectionActivitiesService.create(this.inspectionActivities)
          );
        });
    }
    console.log('save');
  }

  getAllOrganisationUnit(): Observable<OrganisationUnit[]> {
    return this.organisationUnit.asObservable();
  }

  loadOrganisationUnits() {
    // TODO get  by financial year
    this.organisationUnitService.getAllCouncils().subscribe(response => {
      this.organisationUnit.next(response);

      this.loadAllSelectedRisks();
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  private subscribeToResponseAfterCreating(
    result: Observable<InspectionActivities>
  ) {
    result.subscribe({
      next: () =>
        this.router.navigate(['inspection-planning/inspection-activities']),
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
}
