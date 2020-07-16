import { Route } from '@angular/router';

import { RiskListComponent } from './risk-list/risk-list.component';
import { RiskDetailComponent } from './risk-detail/risk-detail.component';
import { RiskResolver } from './risk.resolver';
import { RiskListResolver } from './risk-list.resolver';

export const riskRoutes: Route[] = [
  {
    path: 'new',
    component: RiskDetailComponent,
    resolve: {
      risk: RiskResolver,
    },
  },
  {
    path: ':id/edit',
    component: RiskDetailComponent,
    resolve: {
      risk: RiskResolver,
    },
  },
  {
    path: '',
    component: RiskListComponent,
    resolve: {
      risks: RiskListResolver,
    },
    runGuardsAndResolvers: 'always',
  },
];
