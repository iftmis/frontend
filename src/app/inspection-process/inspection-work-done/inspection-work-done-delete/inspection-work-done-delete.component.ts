import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { InspectionWorkDone } from '../inspection-work-done';

@Component({
  selector: 'app-inspection-work-done-delete',
  templateUrl: './inspection-work-done-delete.component.html',
  styleUrls: ['./inspection-work-done-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionWorkDoneDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: InspectionWorkDone) {}
}
