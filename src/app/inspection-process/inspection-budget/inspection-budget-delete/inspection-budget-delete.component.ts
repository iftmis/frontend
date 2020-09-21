import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { InspectionBudget } from '../inspection-budget';

@Component({
  selector: 'app-inspection-budget-delete',
  templateUrl: './inspection-budget-delete.component.html',
  styleUrls: ['./inspection-budget-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionBudgetDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: InspectionBudget) {}
}
