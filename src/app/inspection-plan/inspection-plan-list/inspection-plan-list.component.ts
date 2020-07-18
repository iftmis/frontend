import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { InspectionPlanService } from './../inspection-plan.service';
import { InspectionPlanDeleteComponent } from '../inspection-plan-delete/inspection-plan-delete.component';
import { InspectionPlan } from '../inspection-plan';

@Component({
  selector: 'app-inspection-plan-list',
  templateUrl: './inspection-plan-list.component.html',
  styleUrls: ['./inspection-plan-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionPlanListComponent implements OnInit {
  displayedColumns = [
    'financialYearName',
    'OrganizationUnitName',
    'formActions',
  ];
  routeData$ = this.route.data;
  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private inspectionPlanService: InspectionPlanService
  ) {}

  ngOnInit() {}

  delete(id: number, inspectionPlan: InspectionPlan) {
    const dialogRef = this.dialog.open(InspectionPlanDeleteComponent, {
      data: inspectionPlan,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.inspectionPlanService.delete(id).subscribe({
          next: () => this.router.navigate(['/inspection-plans']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
