import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Indicator } from './indicator';
import { IndicatorService } from './indicator.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IndicatorListResolver
  implements Resolve<HttpResponse<Indicator[]>> {
  constructor(private service: IndicatorService) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<HttpResponse<Indicator[]>> {
    return this.service.query();
  }
}
