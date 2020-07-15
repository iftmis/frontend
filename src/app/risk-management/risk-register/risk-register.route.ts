import { Route } from '@angular/router';

import { RiskRegisterListComponent } from './risk-register-list/risk-register-list.component';
import { RiskRegisterDetailComponent } from './risk-register-detail/risk-register-detail.component';
import { RiskRegisterResolver } from './risk-register.resolver';
import { RiskListComponent } from '../risk/risk-list/risk-list.component';
import { AuthenticatedUserGuard } from '../../security/authenticated-user.guard';

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
    path: ':id/risks',
    component: RiskListComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':id/risks',
    canActivateChild: [AuthenticatedUserGuard],
    loadChildren: () => import('../risk/risk.module').then(m => m.RiskModule),
  },
  {
    path: '',
    component: RiskRegisterListComponent,
    runGuardsAndResolvers: 'always',
  },
];
