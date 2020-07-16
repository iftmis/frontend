import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { InspectionObjective } from '../inspection-objective';

@Component({
  selector: 'app-inspection-objective-delete',
  templateUrl: './inspection-objective-delete.component.html',
  styleUrls: ['./inspection-objective-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionObjectiveDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: InspectionObjective) {}
}
