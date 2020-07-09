import { Route } from '@angular/router';

import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { PermissionResolver } from './permission.resolver';

export const permissionRoutes: Route[] = [
  {
    path: 'new',
    component: FormComponent,
    resolve: {
      permission: PermissionResolver,
    },
  },
  {
    path: ':id/edit',
    component: FormComponent,
    resolve: {
      permission: PermissionResolver,
    },
  },
  {
    path: '',
    component: ListComponent,
    runGuardsAndResolvers: 'always',
  },
];
