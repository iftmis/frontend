import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { InspectionWorkDoneService } from './../inspection-work-done.service';
import { InspectionWorkDoneDeleteComponent } from '../inspection-work-done-delete/inspection-work-done-delete.component';
import { InspectionWorkDone } from '../inspection-work-done';

@Component({
  selector: 'app-inspection-work-done-list',
  templateUrl: './inspection-work-done-list.component.html',
  styleUrls: ['./inspection-work-done-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionWorkDoneListComponent implements OnInit {
  displayedColumns = ['formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private inspectionWorkDoneService: InspectionWorkDoneService
  ) {}

  ngOnInit() {}

  delete(id: number, inspectionWorkDone: InspectionWorkDone) {
    const dialogRef = this.dialog.open(InspectionWorkDoneDeleteComponent, {
      data: inspectionWorkDone,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.inspectionWorkDoneService.delete(id).subscribe({
          next: () => this.router.navigate(['/inspection-work-dones']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
