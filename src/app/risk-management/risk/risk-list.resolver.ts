import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Risk } from './risk';
import { RiskService } from './risk.service';

@Injectable({
  providedIn: 'root',
})
export class RiskListResolver implements Resolve<Risk[]> {
  constructor(private service: RiskService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Risk[]> {
    return this.service.getAll();
  }
}
