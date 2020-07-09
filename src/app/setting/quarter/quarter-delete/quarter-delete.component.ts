import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Quarter } from '../quarter';

@Component({
  selector: 'app-quarter-delete',
  templateUrl: './quarter-delete.component.html',
  styleUrls: ['./quarter-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuarterDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Quarter) {}
}
