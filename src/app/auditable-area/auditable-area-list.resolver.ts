import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuditableArea } from './auditable-area';
import { AuditableAreaService } from './auditable-area.service';

@Injectable({
  providedIn: 'root',
})
export class AuditableAreaListResolver implements Resolve<AuditableArea[]> {
  constructor(private service: AuditableAreaService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<AuditableArea[]> {
    return this.service.query();
  }
}
