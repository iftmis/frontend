import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuditableArea } from '../auditable-area';

@Component({
  selector: 'app-auditable-area-delete',
  templateUrl: './auditable-area-delete.component.html',
  styleUrls: ['./auditable-area-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditableAreaDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: AuditableArea) {}
}
