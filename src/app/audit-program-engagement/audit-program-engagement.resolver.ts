import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuditProgramEngagement } from './audit-program-engagement';
import { AuditProgramEngagementService } from './audit-program-engagement.service';

@Injectable({
  providedIn: 'root',
})
export class AuditProgramEngagementResolver
  implements Resolve<AuditProgramEngagement | undefined> {
  constructor(private service: AuditProgramEngagementService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<AuditProgramEngagement | undefined> {
    const idParam = 'id';
    const id = route.params[idParam];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
