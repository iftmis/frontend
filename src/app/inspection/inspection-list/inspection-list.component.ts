import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { InspectionService } from './../inspection.service';
import { InspectionDeleteComponent } from '../inspection-delete/inspection-delete.component';
import { Inspection } from '../inspection';
import { OrganisationUnit } from 'src/app/setting/organisation-unit/organisation-unit';
import { BehaviorSubject, Observable } from 'rxjs';
import { FinancialYear } from 'src/app/setting/financial-year/financial-year';
import { InspectionDetailComponent } from '../inspection-detail/inspection-detail.component';

@Component({
  selector: 'app-inspection-list',
  templateUrl: './inspection-list.component.html',
  styleUrls: ['./inspection-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionListComponent implements OnInit {
  displayedColumns = [
    'inspectionType',
    'name',
    'startDate',
    'endDate',
    'formActions',
  ];
  routeData$ = this.route.data;
  showLoader = false;
  organisationUnit: OrganisationUnit;
  inspectionType: string;
  financialYear: FinancialYear;
  inspections: BehaviorSubject<Inspection[]> = new BehaviorSubject([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private inspectionService: InspectionService
  ) {}

  ngOnInit() {
    this.inspectionType = this.route.snapshot.params['type'];
    console.log(this.route.snapshot);
    this.route.data.subscribe(({ organisation, financialYear, type }) => {
      this.organisationUnit = organisation;
      this.financialYear = financialYear;
      this.inspectionType = type;
      this.loadInspection();
    });
  }

  loadInspection() {
    const params = {
      sort: ['id,desc'],
    };
    console.log(this.route.snapshot);

    this.inspectionService
      .query(
        this.financialYear.id!,
        this.inspectionType,
        this.organisationUnit.id!,
        params
      )
      .subscribe(resp => {
        this.inspections.next(resp);
      });
  }

  getInspections(): Observable<Inspection[]> {
    console.log('MyInspection', this.inspections);
    return this.inspections.asObservable();
  }

  createOrEdit(inspection?: Inspection): void {
    const insp: Inspection = inspection || {
      inspectionType: this.inspectionType!,
      organisationUnitId: this.organisationUnit.id!,
      financialYearId: this.financialYear.id!,
      financialYearName: this.financialYear.name,
      organisationUnitName: this.organisationUnit.name,
    };
    const dialogRef = this.dialog.open(InspectionDetailComponent, {
      data: insp,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.loadInspection();
      }
    });
  }

  delete(id: number, inspection: Inspection) {
    const dialogRef = this.dialog.open(InspectionDeleteComponent, {
      data: inspection,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.inspectionService.delete(id).subscribe({
          next: () => this.router.navigate(['/inspections']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
