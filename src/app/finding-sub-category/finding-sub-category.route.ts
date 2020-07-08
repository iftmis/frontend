import { Route } from '@angular/router';

import { FindingSubCategoryListComponent } from './finding-sub-category-list/finding-sub-category-list.component';
import { FindingSubCategoryDetailComponent } from './finding-sub-category-detail/finding-sub-category-detail.component';
import { FindingSubCategoryResolver } from './finding-sub-category.resolver';
import { FindingSubCategoryListResolver } from './finding-sub-category-list.resolver';

export const findingSubCategoryRoutes: Route[] = [
  {
    path: 'new',
    component: FindingSubCategoryDetailComponent,
    resolve: {
      findingSubCategory: FindingSubCategoryResolver,
    },
  },
  {
    path: ':id/edit',
    component: FindingSubCategoryDetailComponent,
    resolve: {
      findingSubCategory: FindingSubCategoryResolver,
    },
  },
  {
    path: '',
    component: FindingSubCategoryListComponent,
    resolve: {
      findingSubCategorys: FindingSubCategoryListResolver,
    },
    runGuardsAndResolvers: 'always',
  },
];
