import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Objective } from '../objective';

@Component({
  selector: 'app-objective-delete',
  templateUrl: './objective-delete.component.html',
  styleUrls: ['./objective-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectiveDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Objective) {}
}
