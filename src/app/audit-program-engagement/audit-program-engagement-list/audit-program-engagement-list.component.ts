import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AuditProgramEngagementService } from './../audit-program-engagement.service';
import { AuditProgramEngagementDeleteComponent } from '../audit-program-engagement-delete/audit-program-engagement-delete.component';
import { AuditProgramEngagement } from '../audit-program-engagement';

@Component({
  selector: 'app-audit-program-engagement-list',
  templateUrl: './audit-program-engagement-list.component.html',
  styleUrls: ['./audit-program-engagement-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditProgramEngagementListComponent implements OnInit {
  displayedColumns = [
    'process',
    'subProcess',
    'subSubProcess',
    'auditableAreaName',
    'formActions',
  ];
  routeData$ = this.route.data;
  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private auditProgramEngagementService: AuditProgramEngagementService
  ) {}

  ngOnInit() {}

  delete(id: number, auditProgramEngagement: AuditProgramEngagement) {
    const dialogRef = this.dialog.open(AuditProgramEngagementDeleteComponent, {
      data: auditProgramEngagement,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.auditProgramEngagementService.delete(id).subscribe({
          next: () => this.router.navigate(['/audit-program-engagements']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
