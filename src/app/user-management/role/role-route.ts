import { Route } from '@angular/router';

import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { RoleResolver } from './role.resolver';

export const roleRoutes: Route[] = [
  {
    path: 'new',
    component: FormComponent,
    resolve: {
      role: RoleResolver,
    },
  },
  {
    path: ':id/edit',
    component: FormComponent,
    resolve: {
      role: RoleResolver,
    },
  },
  {
    path: '',
    component: ListComponent,
    runGuardsAndResolvers: 'always',
  },
];
