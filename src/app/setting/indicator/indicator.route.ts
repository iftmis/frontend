import { Route } from '@angular/router';

import { IndicatorListComponent } from './indicator-list/indicator-list.component';
import { IndicatorDetailComponent } from './indicator-detail/indicator-detail.component';
import { IndicatorResolver } from './indicator.resolver';

export const indicatorRoutes: Route[] = [
  {
    path: 'new',
    component: IndicatorDetailComponent,
    resolve: {
      indicator: IndicatorResolver,
    },
  },
  {
    path: ':id/edit',
    component: IndicatorDetailComponent,
    resolve: {
      indicator: IndicatorResolver,
    },
  },
  {
    path: '',
    component: IndicatorListComponent,
    runGuardsAndResolvers: 'always',
  },
];
