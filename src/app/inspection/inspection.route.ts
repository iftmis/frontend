import { Route } from '@angular/router';

import { InspectionListComponent } from './inspection-list/inspection-list.component';
import { InspectionDetailComponent } from './inspection-detail/inspection-detail.component';
import { InspectionResolver } from './inspection.resolver';
import { InspectionListResolver } from './inspection-list.resolver';

export const inspectionRoutes: Route[] = [
  {
    path: 'new',
    component: InspectionDetailComponent,
    resolve: {
      inspection: InspectionResolver,
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
    path: '',
    component: InspectionListComponent,
    resolve: {
      inspections: InspectionListResolver,
    },
    runGuardsAndResolvers: 'always',
  },
];
