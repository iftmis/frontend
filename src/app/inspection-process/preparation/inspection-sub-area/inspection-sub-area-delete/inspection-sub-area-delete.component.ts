import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { InspectionSubArea } from '../inspection-sub-area';

@Component({
  selector: 'app-inspection-sub-area-delete',
  templateUrl: './inspection-sub-area-delete.component.html',
  styleUrls: ['./inspection-sub-area-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionSubAreaDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: InspectionSubArea) {}
}
