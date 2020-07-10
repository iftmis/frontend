import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Indicator } from '../indicator';

@Component({
  selector: 'app-indicator-delete',
  templateUrl: './indicator-delete.component.html',
  styleUrls: ['./indicator-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicatorDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Indicator) {}
}
