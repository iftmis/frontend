import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Indicator } from './indicator';
import { IndicatorService } from './indicator.service';

@Injectable({
  providedIn: 'root',
})
export class IndicatorResolver implements Resolve<Indicator | undefined> {
  constructor(private service: IndicatorService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Indicator | undefined> {
    const idParam = 'id';
    const id = route.params[idParam];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
