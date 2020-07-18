import { Route } from '@angular/router';

import { InspectionPlanListComponent } from './inspection-plan-list/inspection-plan-list.component';
import { InspectionPlanDetailComponent } from './inspection-plan-detail/inspection-plan-detail.component';
import { InspectionPlanResolver } from './inspection-plan.resolver';
import { InspectionPlanListResolver } from './inspection-plan-list.resolver';

export const inspectionPlanRoutes: Route[] = [
  {
    path: 'new',
    component: InspectionPlanDetailComponent,
    resolve: {
      inspectionPlan: InspectionPlanResolver,
    },
  },
  {
    path: ':id/edit',
    component: InspectionPlanDetailComponent,
    resolve: {
      inspectionPlan: InspectionPlanResolver,
    },
  },
  {
    path: '',
    component: InspectionPlanListComponent,
    resolve: {
      inspectionPlans: InspectionPlanListResolver,
    },
    runGuardsAndResolvers: 'always',
  },
];
