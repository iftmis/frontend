import { Route } from '@angular/router';

import { SubAreaListComponent } from './sub-area-list/sub-area-list.component';
import { SubAreaDetailComponent } from './sub-area-detail/sub-area-detail.component';
import { SubAreaResolver } from './sub-area.resolver';

export const subAreaRoutes: Route[] = [
  {
    path: 'new',
    component: SubAreaDetailComponent,
    resolve: {
      subArea: SubAreaResolver,
    },
  },
  {
    path: ':id/edit',
    component: SubAreaDetailComponent,
    resolve: {
      subArea: SubAreaResolver,
    },
  },
  {
    path: '',
    component: SubAreaListComponent,
    runGuardsAndResolvers: 'always',
  },
];
