import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Risk } from '../risk';

@Component({
  selector: 'app-risk-delete',
  templateUrl: './risk-delete.component.html',
  styleUrls: ['./risk-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Risk) {}
}
