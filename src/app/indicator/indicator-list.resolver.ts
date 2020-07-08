import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Indicator } from './indicator';
import { IndicatorService } from './indicator.service';

@Injectable({
  providedIn: 'root',
})
export class IndicatorListResolver implements Resolve<Indicator[]> {
  constructor(private service: IndicatorService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Indicator[]> {
    return this.service.query();
  }
}
