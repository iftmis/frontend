import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuditableArea } from './auditable-area';
import { AuditableAreaService } from './auditable-area.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuditableAreaListResolver
  implements Resolve<HttpResponse<AuditableArea[]>> {
  constructor(private service: AuditableAreaService) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<HttpResponse<AuditableArea[]>> {
    return this.service.query();
  }
}
