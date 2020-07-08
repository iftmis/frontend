import { Route } from '@angular/router';

import { GfsCodeListComponent } from './gfs-code-list/gfs-code-list.component';
import { GfsCodeDetailComponent } from './gfs-code-detail/gfs-code-detail.component';
import { GfsCodeResolver } from './gfs-code.resolver';
import { GfsCodeListResolver } from './gfs-code-list.resolver';

export const gfsCodeRoutes: Route[] = [
  {
    path: 'new',
    component: GfsCodeDetailComponent,
    resolve: {
      gfsCode: GfsCodeResolver,
    },
  },
  {
    path: ':id/edit',
    component: GfsCodeDetailComponent,
    resolve: {
      gfsCode: GfsCodeResolver,
    },
  },
  {
    path: '',
    component: GfsCodeListComponent,
    resolve: {
      gfsCodes: GfsCodeListResolver,
    },
    runGuardsAndResolvers: 'always',
  },
];
