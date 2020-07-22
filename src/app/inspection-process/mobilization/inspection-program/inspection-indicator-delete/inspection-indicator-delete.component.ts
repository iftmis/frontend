import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { InspectionIndicator } from '../inspection-indicator';

@Component({
  selector: 'app-inspection-indicator-delete',
  templateUrl: './inspection-indicator-delete.component.html',
  styleUrls: ['./inspection-indicator-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionIndicatorDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: InspectionIndicator) {}
}
