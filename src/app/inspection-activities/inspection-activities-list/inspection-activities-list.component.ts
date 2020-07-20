import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { InspectionActivitiesService } from './../inspection-activities.service';
import { InspectionActivitiesDeleteComponent } from '../inspection-activities-delete/inspection-activities-delete.component';
import { InspectionActivities } from '../inspection-activities';

@Component({
  selector: 'app-inspection-activities-list',
  templateUrl: './inspection-activities-list.component.html',
  styleUrls: ['./inspection-activities-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionActivitiesListComponent implements OnInit {
  displayedColumns = [
    'objective',
    'auditableArea',
    'subArea',
    'activity',
    'formActions',
  ];
  routeData$ = this.route.data;
  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private inspectionActivitiesService: InspectionActivitiesService
  ) {}

  ngOnInit() {}

  delete(id: number, inspectionActivities: InspectionActivities) {
    const dialogRef = this.dialog.open(InspectionActivitiesDeleteComponent, {
      data: inspectionActivities,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.inspectionActivitiesService.delete(id).subscribe({
          next: () => this.router.navigate(['/inspection-activities']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
