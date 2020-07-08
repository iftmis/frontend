import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GfsCode } from '../gfs-code';

@Component({
  selector: 'app-gfs-code-delete',
  templateUrl: './gfs-code-delete.component.html',
  styleUrls: ['./gfs-code-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GfsCodeDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: GfsCode) {}
}
