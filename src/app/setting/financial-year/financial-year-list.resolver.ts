import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { FinancialYear } from './financial-year';
import { FinancialYearService } from './financial-year.service';

@Injectable({
  providedIn: 'root',
})
export class FinancialYearListResolver implements Resolve<FinancialYear[]> {
  constructor(private service: FinancialYearService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<FinancialYear[]> {
    return this.service.query();
  }
}
