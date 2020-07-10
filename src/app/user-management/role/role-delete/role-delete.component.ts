import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Role } from '../role';

@Component({
  selector: 'app-role-delete',
  templateUrl: './role-delete.component.html',
  styleUrls: ['./role-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Role) {}
}
