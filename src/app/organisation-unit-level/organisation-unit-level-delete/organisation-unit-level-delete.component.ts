import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { OrganisationUnitLevel } from '../organisation-unit-level';

@Component({
  selector: 'app-organisation-unit-level-delete',
  templateUrl: './organisation-unit-level-delete.component.html',
  styleUrls: ['./organisation-unit-level-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisationUnitLevelDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: OrganisationUnitLevel) {}
}
