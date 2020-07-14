import { Route } from '@angular/router';

import { RiskCategoryListComponent } from './risk-category-list/risk-category-list.component';
import { RiskCategoryDetailComponent } from './risk-category-detail/risk-category-detail.component';
import { RiskCategoryResolver } from './risk-category.resolver';

export const riskCategoryRoutes: Route[] = [
  {
    path: 'new',
    component: RiskCategoryDetailComponent,
    resolve: {
      riskCategory: RiskCategoryResolver,
    },
  },
  {
    path: ':id/edit',
    component: RiskCategoryDetailComponent,
    resolve: {
      riskCategory: RiskCategoryResolver,
    },
  },
  {
    path: '',
    component: RiskCategoryListComponent,
    runGuardsAndResolvers: 'always',
  },
];
