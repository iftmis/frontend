import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { InspectionActivities } from '../inspection-activities';

@Component({
  selector: 'app-inspection-activities-delete',
  templateUrl: './inspection-activities-delete.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionActivitiesDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: InspectionActivities) {}
}
