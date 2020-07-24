import { Route } from '@angular/router';

import { InspectionActivitiesListComponent } from './inspection-activities-list/inspection-activities-list.component';
import { InspectionActivitiesDetailComponent } from './inspection-activities-detail/inspection-activities-detail.component';
import { InspectionActivitiesResolver } from './inspection-activities.resolver';
import { InspectionActivitiesListResolver } from './inspection-activities-list.resolver';

export const inspectionActivitiesRoutes: Route[] = [
  {
    path: 'new',
    component: InspectionActivitiesDetailComponent,
    resolve: {
      inspectionActivities: InspectionActivitiesResolver,
    },
  },
  {
    path: ':id/edit',
    component: InspectionActivitiesDetailComponent,
    resolve: {
      inspectionActivities: InspectionActivitiesResolver,
    },
  },
  {
    path: '',
    component: InspectionActivitiesListComponent,
    resolve: {
      inspectionActivities: InspectionActivitiesListResolver,
    },
    runGuardsAndResolvers: 'always',
  },
];
