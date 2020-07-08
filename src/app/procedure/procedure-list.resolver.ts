import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Procedure } from './procedure';
import { ProcedureService } from './procedure.service';

@Injectable({
  providedIn: 'root',
})
export class ProcedureListResolver implements Resolve<Procedure[]> {
  constructor(private service: ProcedureService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Procedure[]> {
    return this.service.query();
  }
}
