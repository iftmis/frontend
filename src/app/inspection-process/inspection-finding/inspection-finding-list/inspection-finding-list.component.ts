import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { InspectionFindingService } from './../inspection-finding.service';
import { InspectionFindingDeleteComponent } from '../inspection-finding-delete/inspection-finding-delete.component';
import { InspectionFinding } from '../inspection-finding';

@Component({
  selector: 'app-inspection-finding-list',
  templateUrl: './inspection-finding-list.component.html',
  styleUrls: ['./inspection-finding-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionFindingListComponent implements OnInit {
  displayedColumns = ['formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private inspectionFindingService: InspectionFindingService
  ) {}

  ngOnInit() {}

  delete(id: number, inspectionFinding: InspectionFinding) {
    const dialogRef = this.dialog.open(InspectionFindingDeleteComponent, {
      data: inspectionFinding,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.inspectionFindingService.delete(id).subscribe({
          next: () => this.router.navigate(['/inspection-findings']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
