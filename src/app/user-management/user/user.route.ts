import { Route } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserResolver } from './user.resolver';

export const userRoutes: Route[] = [
  {
    path: 'create-new',
    component: UserDetailComponent,
    resolve: {
      user: UserResolver,
    },
  },
  {
    path: ':id/edit',
    component: UserDetailComponent,
    resolve: {
      user: UserResolver,
    },
  },
  {
    path: '',
    component: UserListComponent,
    runGuardsAndResolvers: 'always',
  },
];
