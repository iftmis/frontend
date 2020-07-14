import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Objective } from './objective';
import { ObjectiveService } from './objective.service';

@Injectable({
  providedIn: 'root',
})
export class ObjectiveResolver implements Resolve<Objective | undefined> {
  constructor(private service: ObjectiveService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Objective | undefined> {
    const idParam = 'id';
    const id = route.params[idParam];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
