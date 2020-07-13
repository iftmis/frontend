import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { organisationUnitRoutes } from './organisation-unit.route';
import { OrganisationUnitListComponent } from './organisation-unit-list/organisation-unit-list.component';
import { OrganisationUnitDetailComponent } from './organisation-unit-detail/organisation-unit-detail.component';
import { OrganisationUnitDeleteComponent } from './organisation-unit-delete/organisation-unit-delete.component';
import { TreeModule } from 'angular-tree-component';

@NgModule({
  declarations: [
    OrganisationUnitListComponent,
    OrganisationUnitDetailComponent,
    OrganisationUnitDeleteComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(organisationUnitRoutes),
    TreeModule.forRoot(),
  ],
  exports: [],
})
export class OrganisationUnitModule {}
