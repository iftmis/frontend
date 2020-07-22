import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { InspectionProcedure } from '../inspection-procedure';

@Component({
  selector: 'app-inspection-procedure-delete',
  templateUrl: './inspection-procedure-delete.component.html',
  styleUrls: ['./inspection-procedure-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionProcedureDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: InspectionProcedure) {}
}
