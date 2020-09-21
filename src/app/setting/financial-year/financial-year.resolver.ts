import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { FinancialYear } from './financial-year';
import { FinancialYearService } from './financial-year.service';

@Injectable({
  providedIn: 'root',
})
export class FinancialYearResolver
  implements Resolve<FinancialYear | undefined> {
  constructor(private service: FinancialYearService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<FinancialYear | undefined> {
    const idParam = 'id';
    const id = route.params[idParam] || route.params['fyId'];
    console.log(id);
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
