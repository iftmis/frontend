import { Route } from '@angular/router';

import { ProcedureListComponent } from './procedure-list/procedure-list.component';
import { ProcedureDetailComponent } from './procedure-detail/procedure-detail.component';
import { ProcedureResolver } from './procedure.resolver';
import { ProcedureListResolver } from './procedure-list.resolver';

export const procedureRoutes: Route[] = [
  {
    path: 'new',
    component: ProcedureDetailComponent,
    resolve: {
      procedure: ProcedureResolver,
    },
  },
  {
    path: ':id/edit',
    component: ProcedureDetailComponent,
    resolve: {
      procedure: ProcedureResolver,
    },
  },
  {
    path: '',
    component: ProcedureListComponent,
    resolve: {
      procedures: ProcedureListResolver,
    },
    runGuardsAndResolvers: 'always',
  },
];
