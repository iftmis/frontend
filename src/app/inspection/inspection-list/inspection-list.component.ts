import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { InspectionService } from './../inspection.service';
import { InspectionDeleteComponent } from '../inspection-delete/inspection-delete.component';
import { Inspection } from '../inspection';
import { OrganisationUnit } from 'src/app/setting/organisation-unit/organisation-unit';
import { BehaviorSubject, Observable } from 'rxjs';
import { InspectionActivitiesDetailComponent } from '../../inspection-planning/inspection-activities/inspection-activities-detail/inspection-activities-detail.component';

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
  inspections: BehaviorSubject<Inspection[]> = new BehaviorSubject([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private inspectionService: InspectionService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ organisation }) => {
      this.organisationUnit = organisation;
      this.loadInspection(this.organisationUnit.id);
    });
  }

  loadInspection(ouId: number | undefined) {
    if (ouId === undefined) {
      this.inspections.next([]);
      return;
    }
    this.inspectionService.query(ouId).subscribe(resp => {
      this.inspections.next(resp);
    });
  }

  getInspections(): Observable<Inspection[]> {
    return this.inspections.asObservable();
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
