import { Route } from '@angular/router';

import { FindingCategoryListComponent } from './finding-category-list/finding-category-list.component';
import { FindingCategoryDetailComponent } from './finding-category-detail/finding-category-detail.component';
import { FindingCategoryResolver } from './finding-category.resolver';

export const findingCategoryRoutes: Route[] = [
  {
    path: 'new',
    component: FindingCategoryDetailComponent,
    resolve: {
      findingCategory: FindingCategoryResolver,
    },
  },
  {
    path: ':id/edit',
    component: FindingCategoryDetailComponent,
    resolve: {
      findingCategory: FindingCategoryResolver,
    },
  },
  {
    path: '',
    component: FindingCategoryListComponent,
    runGuardsAndResolvers: 'always',
  },
];
