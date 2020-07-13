import { Route } from '@angular/router';

import { OrganisationUnitListComponent } from './organisation-unit-list/organisation-unit-list.component';
import { OrganisationUnitDetailComponent } from './organisation-unit-detail/organisation-unit-detail.component';
import {
  OrganisationUnitResolver,
  ParentOrganisationUnitResolver,
} from './organisation-unit.resolver';

export const organisationUnitRoutes: Route[] = [
  {
    path: ':parentId/new',
    component: OrganisationUnitDetailComponent,
    resolve: {
      organisationUnit: OrganisationUnitResolver,
      parent: ParentOrganisationUnitResolver,
    },
  },
  {
    path: ':parentId/:id/edit',
    component: OrganisationUnitDetailComponent,
    resolve: {
      organisationUnit: OrganisationUnitResolver,
      parent: ParentOrganisationUnitResolver,
    },
  },
  {
    path: '',
    component: OrganisationUnitListComponent,
    runGuardsAndResolvers: 'always',
  },
];
