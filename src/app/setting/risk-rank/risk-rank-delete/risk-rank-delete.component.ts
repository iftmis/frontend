import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RiskRank } from '../risk-rank';

@Component({
  selector: 'app-risk-rank-delete',
  templateUrl: './risk-rank-delete.component.html',
  styleUrls: ['./risk-rank-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskRankDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: RiskRank) {}
}
