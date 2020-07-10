import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { User } from '../user';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: User) {}
}
