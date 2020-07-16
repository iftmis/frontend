import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Risk } from './risk';
import { RiskService } from './risk.service';

@Injectable({
  providedIn: 'root',
})
export class RiskResolver implements Resolve<Risk | undefined> {
  constructor(private service: RiskService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Risk | undefined> {
    const idParam = 'id';
    const id = route.params[idParam];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
