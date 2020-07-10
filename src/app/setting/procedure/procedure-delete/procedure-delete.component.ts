import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Procedure } from '../procedure';

@Component({
  selector: 'app-procedure-delete',
  templateUrl: './procedure-delete.component.html',
  styleUrls: ['./procedure-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcedureDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Procedure) {}
}
