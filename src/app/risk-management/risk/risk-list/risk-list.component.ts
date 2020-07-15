import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { RiskService } from '../risk.service';
import { RiskDeleteComponent } from '../risk-delete/risk-delete.component';
import { Risk } from '../risk';

@Component({
  selector: 'app-risk-list',
  templateUrl: './risk-list.component.html',
  styleUrls: ['./risk-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskListComponent implements OnInit {
  displayedColumns = ['name', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private riskService: RiskService
  ) {}

  ngOnInit() {}

  delete(id: number, risk: Risk) {
    const dialogRef = this.dialog.open(RiskDeleteComponent, {
      data: risk,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.riskService.delete(id).subscribe({
          next: () => this.router.navigate(['/risk-management/risks']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
