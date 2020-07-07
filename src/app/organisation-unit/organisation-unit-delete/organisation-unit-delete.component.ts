import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { OrganisationUnit } from '../organisation-unit';

@Component({
  selector: 'app-organisation-unit-delete',
  templateUrl: './organisation-unit-delete.component.html',
  styleUrls: ['./organisation-unit-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisationUnitDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: OrganisationUnit) {}
}
