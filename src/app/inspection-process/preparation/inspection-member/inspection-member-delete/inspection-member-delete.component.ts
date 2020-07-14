import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { InspectionMember } from '../inspection-member';

@Component({
  selector: 'app-inspection-member-delete',
  templateUrl: './inspection-member-delete.component.html',
  styleUrls: ['./inspection-member-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionMemberDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: InspectionMember) {}
}
