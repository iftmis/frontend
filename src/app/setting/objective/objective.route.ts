import { Route } from '@angular/router';

import { ObjectiveListComponent } from './objective-list/objective-list.component';
import { ObjectiveDetailComponent } from './objective-detail/objective-detail.component';
import { ObjectiveResolver } from './objective.resolver';
import { ObjectiveListResolver } from './objective-list.resolver';

export const objectiveRoutes: Route[] = [
  {
    path: 'new',
    component: ObjectiveDetailComponent,
    resolve: {
      objective: ObjectiveResolver,
    },
  },
  {
    path: ':id/edit',
    component: ObjectiveDetailComponent,
    resolve: {
      objective: ObjectiveResolver,
    },
  },
  {
    path: '',
    component: ObjectiveListComponent,
    resolve: {
      objectives: ObjectiveListResolver,
    },
    runGuardsAndResolvers: 'always',
  },
];
