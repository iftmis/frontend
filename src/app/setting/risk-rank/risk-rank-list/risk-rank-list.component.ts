import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { RiskRankService } from '../risk-rank.service';
import { RiskRankDeleteComponent } from '../risk-rank-delete/risk-rank-delete.component';
import { RiskRank } from '../risk-rank';

@Component({
  selector: 'app-risk-rank-list',
  templateUrl: './risk-rank-list.component.html',
  styleUrls: ['./risk-rank-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskRankListComponent implements OnInit {
  displayedColumns = [
    'name',
    'minValue',
    'maxValue',
    'hexColor',
    'formActions',
  ];
  routeData$ = this.route.data;
  showLoader = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private riskRankService: RiskRankService
  ) {}

  ngOnInit() {}

  delete(id: number, riskRank: RiskRank) {
    const dialogRef = this.dialog.open(RiskRankDeleteComponent, {
      data: riskRank,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.riskRankService.delete(id).subscribe({
          next: () => this.router.navigate(['/settings/risk-ranks']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
