import { Route } from '@angular/router';

import { FinancialYearListComponent } from './financial-year-list/financial-year-list.component';
import { FinancialYearDetailComponent } from './financial-year-detail/financial-year-detail.component';
import { FinancialYearResolver } from './financial-year.resolver';
import { FinancialYearListResolver } from './financial-year-list.resolver';

export const financialYearRoutes: Route[] = [
  {
    path: 'new',
    component: FinancialYearDetailComponent,
    resolve: {
      financialYear: FinancialYearResolver,
    },
  },
  {
    path: ':id/edit',
    component: FinancialYearDetailComponent,
    resolve: {
      financialYear: FinancialYearResolver,
    },
  },
  {
    path: '',
    component: FinancialYearListComponent,
    resolve: {
      financialYears: FinancialYearListResolver,
    },
    runGuardsAndResolvers: 'always',
  },
];
