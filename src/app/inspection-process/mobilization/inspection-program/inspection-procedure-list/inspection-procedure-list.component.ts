import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { InspectionProcedureService } from '../inspection-procedure.service';
import { InspectionProcedureDeleteComponent } from '../inspection-procedure-delete/inspection-procedure-delete.component';
import { InspectionProcedure } from '../inspection-procedure';

@Component({
  selector: 'app-inspection-procedure-list',
  templateUrl: './inspection-procedure-list.component.html',
  styleUrls: ['./inspection-procedure-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionProcedureListComponent implements OnInit {
  displayedColumns = ['name', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private inspectionProcedureService: InspectionProcedureService
  ) {}

  ngOnInit() {}

  delete(id: number, inspectionProcedure: InspectionProcedure) {
    const dialogRef = this.dialog.open(InspectionProcedureDeleteComponent, {
      data: inspectionProcedure,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.inspectionProcedureService.delete(id).subscribe({
          next: () => this.router.navigate(['/inspection-procedures']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
