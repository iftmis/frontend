import { Route } from '@angular/router';

import { OrganisationUnitLevelListComponent } from './organisation-unit-level-list/organisation-unit-level-list.component';
import { OrganisationUnitLevelDetailComponent } from './organisation-unit-level-detail/organisation-unit-level-detail.component';
import { OrganisationUnitLevelResolver } from './organisation-unit-level.resolver';
import { OrganisationUnitLevelListResolver } from './organisation-unit-level-list.resolver';

export const organisationUnitLevelRoutes: Route[] = [
  {
    path: 'new',
    component: OrganisationUnitLevelDetailComponent,
    resolve: {
      organisationUnitLevel: OrganisationUnitLevelResolver,
    },
  },
  {
    path: ':id/edit',
    component: OrganisationUnitLevelDetailComponent,
    resolve: {
      organisationUnitLevel: OrganisationUnitLevelResolver,
    },
  },
  {
    path: '',
    component: OrganisationUnitLevelListComponent,
    resolve: {
      organisationUnitLevels: OrganisationUnitLevelListResolver,
    },
    runGuardsAndResolvers: 'always',
  },
];
