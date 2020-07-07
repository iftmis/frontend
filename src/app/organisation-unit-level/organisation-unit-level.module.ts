import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { organisationUnitLevelRoutes } from './organisation-unit-level.route';
import { OrganisationUnitLevelListComponent } from './organisation-unit-level-list/organisation-unit-level-list.component';
import { OrganisationUnitLevelDetailComponent } from './organisation-unit-level-detail/organisation-unit-level-detail.component';
import { OrganisationUnitLevelDeleteComponent } from './organisation-unit-level-delete/organisation-unit-level-delete.component';

@NgModule({
  declarations: [
    OrganisationUnitLevelListComponent,
    OrganisationUnitLevelDetailComponent,
    OrganisationUnitLevelDeleteComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(organisationUnitLevelRoutes)],
  exports: [],
})
export class OrganisationUnitLevelModule {}
