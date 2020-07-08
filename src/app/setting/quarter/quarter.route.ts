import { Route } from '@angular/router';

import { QuarterListComponent } from './quarter-list/quarter-list.component';
import { QuarterDetailComponent } from './quarter-detail/quarter-detail.component';
import { QuarterResolver } from './quarter.resolver';
import { QuarterListResolver } from './quarter-list.resolver';

export const quarterRoutes: Route[] = [
  {
    path: 'new',
    component: QuarterDetailComponent,
    resolve: {
      quarter: QuarterResolver,
    },
  },
  {
    path: ':id/edit',
    component: QuarterDetailComponent,
    resolve: {
      quarter: QuarterResolver,
    },
  },
  {
    path: '',
    component: QuarterListComponent,
    resolve: {
      quarters: QuarterListResolver,
    },
    runGuardsAndResolvers: 'always',
  },
];
