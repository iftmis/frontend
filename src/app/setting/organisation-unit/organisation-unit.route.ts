import { Route } from '@angular/router';

import { OrganisationUnitListComponent } from './organisation-unit-list/organisation-unit-list.component';
import { OrganisationUnitDetailComponent } from './organisation-unit-detail/organisation-unit-detail.component';
import { OrganisationUnitResolver } from './organisation-unit.resolver';
import { OrganisationUnitListResolver } from './organisation-unit-list.resolver';

export const organisationUnitRoutes: Route[] = [
  {
    path: 'new',
    component: OrganisationUnitDetailComponent,
    resolve: {
      organisationUnit: OrganisationUnitResolver,
    },
  },
  {
    path: ':id/edit',
    component: OrganisationUnitDetailComponent,
    resolve: {
      organisationUnit: OrganisationUnitResolver,
    },
  },
  {
    path: '',
    component: OrganisationUnitListComponent,
    resolve: {
      organisationUnits: OrganisationUnitListResolver,
    },
    runGuardsAndResolvers: 'always',
  },
];
