import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuditProgramEngagement } from '../audit-program-engagement';

@Component({
  selector: 'app-audit-program-engagement-delete',
  templateUrl: './audit-program-engagement-delete.component.html',
  styleUrls: ['./audit-program-engagement-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditProgramEngagementDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: AuditProgramEngagement) {}
}
