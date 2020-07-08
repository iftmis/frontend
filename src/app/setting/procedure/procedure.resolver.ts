import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Procedure } from './procedure';
import { ProcedureService } from './procedure.service';

@Injectable({
  providedIn: 'root',
})
export class ProcedureResolver implements Resolve<Procedure | undefined> {
  constructor(private service: ProcedureService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Procedure | undefined> {
    const idParam = 'id';
    const id = route.params[idParam];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
