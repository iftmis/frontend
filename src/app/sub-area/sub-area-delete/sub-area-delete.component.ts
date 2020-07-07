import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SubArea } from '../sub-area';

@Component({
  selector: 'app-sub-area-delete',
  templateUrl: './sub-area-delete.component.html',
  styleUrls: ['./sub-area-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubAreaDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: SubArea) {}
}
