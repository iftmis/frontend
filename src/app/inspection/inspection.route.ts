import { Route } from '@angular/router';

import { InspectionListComponent } from './inspection-list/inspection-list.component';
import { InspectionDetailComponent } from './inspection-detail/inspection-detail.component';
import { InspectionResolver } from './inspection.resolver';
import { InspectionListResolver } from './inspection-list.resolver';
import { OrganisationUnitResolver } from '../setting/organisation-unit/organisation-unit.resolver';

export const inspectionRoutes: Route[] = [
  {
    path: ':organisationUnitId/new',
    component: InspectionDetailComponent,
    resolve: {
      inspection: InspectionResolver,
      organisation: OrganisationUnitResolver,
    },
  },
  {
    path: ':id/edit',
    component: InspectionDetailComponent,
    resolve: {
      inspection: InspectionResolver,
    },
  },
  {
    path: ':organisationUnitId',
    component: InspectionListComponent,
    resolve: {
      organisation: OrganisationUnitResolver,
    },
    runGuardsAndResolvers: 'always',
  },
];
