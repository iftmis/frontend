import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { RiskRegister } from './risk-register';
import { RiskRegisterService } from './risk-register.service';

@Injectable({
  providedIn: 'root',
})
export class RiskRegisterResolver implements Resolve<RiskRegister | undefined> {
  constructor(private service: RiskRegisterService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<RiskRegister | undefined> {
    const idParam = 'id';
    const id = route.params[idParam];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
