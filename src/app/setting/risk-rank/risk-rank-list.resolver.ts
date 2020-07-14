import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { RiskRank } from './risk-rank';
import { RiskRankService } from './risk-rank.service';

@Injectable({
  providedIn: 'root',
})
export class RiskRankListResolver implements Resolve<RiskRank[]> {
  constructor(private service: RiskRankService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<RiskRank[]> {
    return this.service.query();
  }
}
