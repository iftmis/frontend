import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { InspectionService } from '../inspection.service';
import { InspectionFormService } from './inspection-form.service';
import { Inspection } from '../inspection';
import { OrganisationUnit } from 'src/app/setting/organisation-unit/organisation-unit';
import { FinancialYear } from 'src/app/setting/financial-year/financial-year';
import { FinancialYearService } from 'src/app/setting/financial-year/financial-year.service';

@Component({
  selector: 'app-inspection-detail',
  templateUrl: './inspection-detail.component.html',
  styleUrls: ['./inspection-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionDetailComponent implements OnInit {
  inspection: Inspection;
  form: FormGroup;
  isSaveOrUpdateInProgress = false;
  inspectionTypeOptions: KeyValue<string, string>[] = [
    { key: 'PLANNED', value: 'Planned' },
    { key: 'SPECIAL', value: 'Special' },
  ];
  error: string | undefined = undefined;
  organisationUnit: OrganisationUnit;
  financialYears: BehaviorSubject<FinancialYear[]> = new BehaviorSubject([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: InspectionFormService,
    private inspectionService: InspectionService,
    private fyService: FinancialYearService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ inspection, organisation }) => {
      console.log(organisation);
      this.inspection = inspection;
      this.organisationUnit = organisation;
      this.form = this.formService.toFormGroup(inspection);
      this.form.patchValue({ organisationUnitId: organisation.id });
    });
    this.loadFinancialYears();

    this.error = undefined;
  }

  loadFinancialYears() {
    this.fyService.getAll().subscribe(resp => {
      this.financialYears.next(resp.body || []);
    });
  }

  getFinancialYears(): Observable<FinancialYear[]> {
    return this.financialYears.asObservable();
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.inspectionService.update(this.formService.fromFormGroup(this.form))
      );
    } else {
      this.subscribeToResponse(
        this.inspectionService.create(this.formService.fromFormGroup(this.form))
      );
    }
  }

  private subscribeToResponse(result: Observable<Inspection>) {
    result.subscribe({
      next: () =>
        this.router.navigate(['/inspections', this.organisationUnit.id]),
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
    this.router.navigate(['/inspections']);
    return false;
  }
}
