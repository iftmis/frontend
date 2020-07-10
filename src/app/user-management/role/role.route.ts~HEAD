import { Route } from '@angular/router';

import { RoleListComponent } from './role-list/role-list.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { RoleResolver } from './role.resolver';
import { RoleListResolver } from './role-list.resolver';

export const roleRoutes: Route[] = [
  {
    path: 'new',
    component: RoleDetailComponent,
    resolve: {
      role: RoleResolver,
    },
  },
  {
    path: ':id/edit',
    component: RoleDetailComponent,
    resolve: {
      role: RoleResolver,
    },
  },
  {
    path: '',
    component: RoleListComponent,
    resolve: {
      roles: RoleListResolver,
    },
    runGuardsAndResolvers: 'always',
  },
];
