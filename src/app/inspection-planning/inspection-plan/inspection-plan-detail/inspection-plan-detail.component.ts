import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { InspectionPlanService } from '../inspection-plan.service';
import { InspectionPlanFormService } from './inspection-plan-form.service';
import { InspectionPlan } from '../inspection-plan';
import { OrganisationUnit } from '../../../setting/organisation-unit/organisation-unit';
import { FinancialYear } from '../../../setting/financial-year/financial-year';
import { FinancialYearService } from '../../../setting/financial-year/financial-year.service';
import { ToastService } from '../../../shared/toast.service';
import { OrganisationUnitService } from '../../../setting/organisation-unit/organisation-unit.service';

@Component({
  selector: 'app-inspection-plan-detail',
  templateUrl: './inspection-plan-detail.component.html',
  styleUrls: ['./inspection-plan-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionPlanDetailComponent implements OnInit {
  inspectionPlan: InspectionPlan;
  form: FormGroup;
  public showProgress: boolean;
  error: string | undefined = undefined;
  organisationUnitSubject: BehaviorSubject<
    OrganisationUnit[]
  > = new BehaviorSubject([]);
  financialYearSubject: BehaviorSubject<FinancialYear[]> = new BehaviorSubject(
    []
  );

  public title: string;
  public action: string;
  public label: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: InspectionPlanFormService,
    private inspectionPlanService: InspectionPlanService,
    private financialYearService: FinancialYearService,
    private toastService: ToastService,
    private organisationUnitService: OrganisationUnitService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<InspectionPlanDetailComponent>
  ) {
    this.showProgress = false;
    this.title = data.title;
    this.action = data.action;
    this.label = data.label;
  }

  ngOnInit() {
    this.route.data.subscribe(({ inspectionPlan }) => {
      this.inspectionPlan = inspectionPlan;
      this.form = this.formService.toFormGroup(inspectionPlan);
    });
    this.loadFinancialYears();
    this.loadCouncils();

    this.error = undefined;
  }

  saveOrUpdate() {
    this.showProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.inspectionPlanService.update(
          this.formService.fromFormGroup(this.form)
        ),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.inspectionPlanService.create(
          this.formService.fromFormGroup(this.form)
        ),
        'create'
      );
    }
  }

  getCouncils(): Observable<OrganisationUnit[]> {
    return this.organisationUnitSubject.asObservable();
  }

  getFinancialYear(): Observable<FinancialYear[]> {
    return this.financialYearSubject.asObservable();
  }

  loadCouncils() {
    this.organisationUnitService.getAllCouncils().subscribe(
      response => {
        this.organisationUnitSubject.next(response);
      },
      error => {}
    );
  }

  loadFinancialYears() {
    this.financialYearService.getAllUnPaged().subscribe(
      response => {
        this.financialYearSubject.next(response);
      },
      error => {}
    );
  }
  private subscribeToResponse(
    result: Observable<InspectionPlan>,
    action: string
  ) {
    result.subscribe({
      next: () => {
        if (action === 'create') {
          this.toastService.success(
            'Success!',
            'Inspection Plan Created Successfully!'
          );
        } else {
          this.toastService.success(
            'Success!',
            'Inspection Plan Updated Successfully!'
          );
        }
        this._dialogRef.close({ success: true });
      },
      error: response => {
        this.showProgress = false;
        this.error = response.error
          ? response.error.detail ||
            response.error.title ||
            'Internal Server Error'
          : 'Internal Server Error';
      },
      complete: () => (this.showProgress = false),
    });
  }

  cancel() {
    console.log(
      'this is ' +
        this.formService.fromFormGroup(this.form).financialYearId +
        'now '
    );
    this.router.navigate(['/inspection-planning']);
    return false;
  }
}
