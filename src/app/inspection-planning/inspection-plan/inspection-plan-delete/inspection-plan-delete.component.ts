import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { InspectionPlan } from '../inspection-plan';

@Component({
  selector: 'app-inspection-plan-delete',
  templateUrl: './inspection-plan-delete.component.html',
  styleUrls: ['./inspection-plan-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionPlanDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: InspectionPlan) {}
}
