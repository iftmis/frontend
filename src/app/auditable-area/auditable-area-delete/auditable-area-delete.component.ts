import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuditableArea } from '../auditable-area';
import { environment } from '../../../environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-auditable-area-delete',
  templateUrl: './auditable-area-delete.component.html',
  styleUrls: ['./auditable-area-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditableAreaDeleteComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AuditableArea,
    private titleService: Title
  ) {
    this.titleService.setTitle('Delete Confirmation|' + environment.app);
  }
}
