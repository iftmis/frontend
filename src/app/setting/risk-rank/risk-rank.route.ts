import { Route } from '@angular/router';

import { RiskRankListComponent } from './risk-rank-list/risk-rank-list.component';
import { RiskRankDetailComponent } from './risk-rank-detail/risk-rank-detail.component';
import { RiskRankResolver } from './risk-rank.resolver';
import { RiskRankListResolver } from './risk-rank-list.resolver';

export const riskRankRoutes: Route[] = [
  {
    path: 'new',
    component: RiskRankDetailComponent,
    resolve: {
      riskRank: RiskRankResolver,
    },
  },
  {
    path: ':id/edit',
    component: RiskRankDetailComponent,
    resolve: {
      riskRank: RiskRankResolver,
    },
  },
  {
    path: '',
    component: RiskRankListComponent,
    resolve: {
      riskRanks: RiskRankListResolver,
    },
    runGuardsAndResolvers: 'always',
  },
];
