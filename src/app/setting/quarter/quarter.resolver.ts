import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Quarter } from './quarter';
import { QuarterService } from './quarter.service';

@Injectable({
  providedIn: 'root',
})
export class QuarterResolver implements Resolve<Quarter | undefined> {
  constructor(private service: QuarterService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Quarter | undefined> {
    const idParam = 'id';
    const id = route.params[idParam];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
