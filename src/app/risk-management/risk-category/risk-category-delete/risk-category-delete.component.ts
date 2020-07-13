import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RiskCategory } from '../risk-category';

@Component({
  selector: 'app-risk-category-delete',
  templateUrl: './risk-category-delete.component.html',
  styleUrls: ['./risk-category-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskCategoryDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: RiskCategory) {}
}
