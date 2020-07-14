import { Route } from '@angular/router';

import { RiskRegisterListComponent } from './risk-register-list/risk-register-list.component';
import { RiskRegisterDetailComponent } from './risk-register-detail/risk-register-detail.component';
import { RiskRegisterResolver } from './risk-register.resolver';

export const riskRegisterRoutes: Route[] = [
  {
    path: 'new',
    component: RiskRegisterDetailComponent,
    resolve: {
      riskRegister: RiskRegisterResolver,
    },
  },
  {
    path: ':id/edit',
    component: RiskRegisterDetailComponent,
    resolve: {
      riskRegister: RiskRegisterResolver,
    },
  },
  {
    path: '',
    component: RiskRegisterListComponent,
    runGuardsAndResolvers: 'always',
  },
];
