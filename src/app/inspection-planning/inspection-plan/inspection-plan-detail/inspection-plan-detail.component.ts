import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
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
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;
  organisationUnitSubject: BehaviorSubject<
    OrganisationUnit[]
  > = new BehaviorSubject([]);

  financialYearSubject: BehaviorSubject<FinancialYear[]> = new BehaviorSubject(
    []
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: InspectionPlanFormService,
    private inspectionPlanService: InspectionPlanService,
    private financialYearService: FinancialYearService,
    private toastService: ToastService,
    private organisationUnitService: OrganisationUnitService
  ) {}

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
    this.isSaveOrUpdateInProgress = true;
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
          this.toastService.success('Success!', 'Risk Created Successfully!');
        } else {
          this.toastService.success('Success!', 'Risk Updated Successfully!');
        }
        this.router.navigate(['/inspection-plans']);
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
    this.router.navigate(['/inspection-plans']);
    return false;
  }
}
