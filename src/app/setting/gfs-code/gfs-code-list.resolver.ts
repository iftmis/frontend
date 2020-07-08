import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { GfsCode } from './gfs-code';
import { GfsCodeService } from './gfs-code.service';

@Injectable({
  providedIn: 'root',
})
export class GfsCodeListResolver implements Resolve<GfsCode[]> {
  constructor(private service: GfsCodeService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<GfsCode[]> {
    return this.service.query();
  }
}
