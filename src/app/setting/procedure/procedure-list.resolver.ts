import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { HttpResponse } from '@angular/common/http';
import { Procedure } from './procedure';
import { ProcedureService } from './procedure.service';

@Injectable({
  providedIn: 'root',
})
export class ProcedureListResolver
  implements Resolve<HttpResponse<Procedure[]>> {
  constructor(private service: ProcedureService) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<HttpResponse<Procedure[]>> {
    return this.service.getAllPaged();
  }
}
