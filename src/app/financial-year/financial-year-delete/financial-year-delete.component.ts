import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FinancialYear } from '../financial-year';

@Component({
  selector: 'app-financial-year-delete',
  templateUrl: './financial-year-delete.component.html',
  styleUrls: ['./financial-year-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinancialYearDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: FinancialYear) {}
}
