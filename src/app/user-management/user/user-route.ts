import { Route } from '@angular/router';

import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { UserResolver } from './user.resolver';

export const userRoutes: Route[] = [
  {
    path: 'new',
    component: FormComponent,
    resolve: {
      user: UserResolver,
    },
  },
  {
    path: ':id/edit',
    component: FormComponent,
    resolve: {
      user: UserResolver,
    },
  },
  {
    path: '',
    component: ListComponent,
    runGuardsAndResolvers: 'always',
  },
];
