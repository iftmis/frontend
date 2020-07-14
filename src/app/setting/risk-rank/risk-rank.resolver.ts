import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { RiskRank } from './risk-rank';
import { RiskRankService } from './risk-rank.service';

@Injectable({
  providedIn: 'root',
})
export class RiskRankResolver implements Resolve<RiskRank | undefined> {
  constructor(private service: RiskRankService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<RiskRank | undefined> {
    const idParam = 'id';
    const id = route.params[idParam];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
