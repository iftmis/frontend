import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { GfsCode } from './gfs-code';
import { GfsCodeService } from './gfs-code.service';

@Injectable({
  providedIn: 'root',
})
export class GfsCodeResolver implements Resolve<GfsCode | undefined> {
  constructor(private service: GfsCodeService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<GfsCode | undefined> {
    const idParam = 'id';
    const id = route.params[idParam];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
