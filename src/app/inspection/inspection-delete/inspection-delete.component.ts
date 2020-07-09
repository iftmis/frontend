import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Inspection } from '../inspection';

@Component({
  selector: 'app-inspection-delete',
  templateUrl: './inspection-delete.component.html',
  styleUrls: ['./inspection-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Inspection) {}
}
