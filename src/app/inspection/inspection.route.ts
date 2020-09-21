import { ActivatedRouteSnapshot, Resolve, Route } from '@angular/router';

import { InspectionListComponent } from './inspection-list/inspection-list.component';
import { OrganisationUnitResolver } from '../setting/organisation-unit/organisation-unit.resolver';
import { FinancialYearResolver } from '../setting/financial-year/financial-year.resolver';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InspectionTypeResolver implements Resolve<string | undefined> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot): Observable<string | undefined> {
    return of(route.params['type']);
  }
}

export const inspectionRoutes: Route[] = [
  {
    path: ':fyId/:type/:organisationUnitId',
    component: InspectionListComponent,
    resolve: {
      organisation: OrganisationUnitResolver,
      financialYear: FinancialYearResolver,
      type: InspectionTypeResolver,
    },
    runGuardsAndResolvers: 'always',
  },
];
