import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { InspectionFinding } from '../inspection-finding';

@Component({
  selector: 'app-inspection-finding-delete',
  templateUrl: './inspection-finding-delete.component.html',
  styleUrls: ['./inspection-finding-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionFindingDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: InspectionFinding) {}
}
