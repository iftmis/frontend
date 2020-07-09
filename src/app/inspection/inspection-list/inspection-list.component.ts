import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { InspectionService } from './../inspection.service';
import { InspectionDeleteComponent } from '../inspection-delete/inspection-delete.component';
import { Inspection } from '../inspection';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private inspectionService: InspectionService
  ) {}

  ngOnInit() {}

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
