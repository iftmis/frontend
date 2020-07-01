import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuditProgramEngagement } from './audit-program-engagement';
import { AuditProgramEngagementService } from './audit-program-engagement.service';

@Injectable({
  providedIn: 'root',
})
export class AuditProgramEngagementListResolver
  implements Resolve<AuditProgramEngagement[]> {
  constructor(private service: AuditProgramEngagementService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<AuditProgramEngagement[]> {
    return this.service.query();
  }
}
