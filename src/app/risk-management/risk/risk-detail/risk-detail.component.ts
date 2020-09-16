import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { RiskService } from '../risk.service';
import { RiskFormService } from './risk-form.service';
import { Risk, RiskRating } from '../risk';
import { RiskCategory } from '../../../setting/risk-category/risk-category';
import { Objective } from '../../../setting/objective/objective';
import { ObjectiveService } from '../../../setting/objective/objective.service';
import { RiskCategoryService } from '../../../setting/risk-category/risk-category.service';
import { RiskRegister } from '../../risk-register/risk-register';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../shared/toast.service';
import { OrganisationUnit } from '../../../setting/organisation-unit/organisation-unit';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-risk-detail',
  templateUrl: './risk-detail.component.html',
  styleUrls: ['./risk-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskDetailComponent implements OnInit {
  risk: Risk;
  form: FormGroup;
  riskRatings: RiskRating[] = [];
  ratingForm: FormGroup;
  riskRegister: RiskRegister;
  organisationUnit: OrganisationUnit;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;
  riskCategorySubject: BehaviorSubject<RiskCategory[]> = new BehaviorSubject(
    []
  );
  action: string;

  objectiveSubject: BehaviorSubject<Objective[]> = new BehaviorSubject([]);

  sourceControl = new FormControl('COUNCIL');
  impactControl = new FormControl(1);
  likelihoodControl = new FormControl(1);
  commentControl = new FormControl('No Comment');
  impacts = [1, 2, 3, 4, 5];
  likelihoods = [1, 2, 3, 4, 5];
  parentId: number;

  displayedColumns: string[] = [
    'id',
    'source',
    'likelihood',
    'impact',
    'comment',
    'manage',
  ];
  ratingDataSource = new MatTableDataSource<RiskRating>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: RiskFormService,
    private riskService: RiskService,
    private objectiveService: ObjectiveService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<RiskDetailComponent>,
    private riskCategoryService: RiskCategoryService
  ) {
    this.action = data.action;
    if (this.action === 'update') {
      this.risk = data.risk;
      this.riskRatings = data.risk.riskRatings;
      this.ratingDataSource.data = this.riskRatings;
    }
    this.riskRegister = data.riskRegister;
  }

  ngOnInit() {
    this.form = this.formService.toFormGroup(this.risk);
    this.error = undefined;
    this.loadObjectives();
    this.loadRiskCategories();
  }

  loadObjectives() {
    this.objectiveService.getAllUnPaged().subscribe(
      response => {
        this.objectiveSubject.next(response);
      },
      error => {}
    );
  }

  loadRiskCategories() {
    this.riskCategoryService.getAllUnPaged().subscribe(
      response => {
        this.riskCategorySubject.next(response);
      },
      error => {}
    );
  }

  getRiskCategories(): Observable<RiskCategory[]> {
    return this.riskCategorySubject.asObservable();
  }

  getObjectives(): Observable<Objective[]> {
    return this.objectiveSubject.asObservable();
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      const payload = {
        id: this.form.value.id,
        code: this.form.value.code,
        description: this.form.value.description,
        objectiveId: this.form.value.objectiveId,
        riskCategoryId: this.form.value.riskCategoryId,
        riskRegisterId: this.riskRegister.id,
        riskRatings: this.riskRatings,
      } as Risk;
      console.log(payload);
      this.subscribeToResponse(this.riskService.update(payload));
    } else {
      const payload = {
        code: this.form.value.code,
        description: this.form.value.description,
        objectiveId: this.form.value.objectiveId,
        riskCategoryId: this.form.value.riskCategoryId,
        riskRegisterId: this.riskRegister.id,
        riskRatings: this.riskRatings,
      } as Risk;
      console.log(payload);
      this.subscribeToResponse(this.riskService.create(payload));
    }
  }

  private subscribeToResponse(result: Observable<Risk>) {
    result.subscribe({
      next: () => {
        this.dialogRef.close({ success: true });
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
    this.dialogRef.close();
    return false;
  }

  addRating() {
    let exits = false;
    this.riskRatings.map(row => {
      if (row.source === this.sourceControl.value) {
        exits = true;
      }
    });
    if (exits) {
      this.toastService.error('Duplicate!', 'Risk Source Already Added!');
    } else {
      const item = {
        source: this.sourceControl.value,
        comments: this.commentControl.value,
        impact: this.impactControl.value,
        likelihood: this.likelihoodControl.value,
      } as RiskRating;

      this.riskRatings.push(item);
      this.ratingDataSource.data = this.riskRatings;
      this.sourceControl.reset('');
      this.impactControl.reset('');
      this.likelihoodControl.reset('');
      this.commentControl.reset('');
    }
  }

  deleteRating(i: number) {
    this.riskRatings.splice(i, 1);
    this.ratingDataSource.data = this.riskRatings;
  }
}
