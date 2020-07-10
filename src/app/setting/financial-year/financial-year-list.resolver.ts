import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FinancialYear } from './financial-year';
import { HttpResponse } from '@angular/common/http';
import { FinancialYearService } from './financial-year.service';

@Injectable({
  providedIn: 'root',
})
export class FinancialYearListResolver
  implements Resolve<HttpResponse<FinancialYear[]>> {
  constructor(private service: FinancialYearService) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<HttpResponse<FinancialYear[]>> {
    return this.service.getAll();
  }
}
