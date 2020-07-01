import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuditableArea } from './auditable-area';
import { AuditableAreaService } from './auditable-area.service';

@Injectable({
  providedIn: 'root',
})
export class AuditableAreaResolver
  implements Resolve<AuditableArea | undefined> {
  constructor(private service: AuditableAreaService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<AuditableArea | undefined> {
    const idParam = 'id';
    const id = route.params[idParam];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
