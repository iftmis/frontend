import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuditProgramEngagement } from './audit-program-engagement';

@Injectable({
  providedIn: 'root',
})
export class AuditProgramEngagementService {
  private resourceUrl = 'api/audit-program-engagements';

  constructor(private http: HttpClient) {}

  query(): Observable<AuditProgramEngagement[]> {
    return this.http.get<AuditProgramEngagement[]>(this.resourceUrl);
  }

  getById(id: number): Observable<AuditProgramEngagement> {
    return this.http.get<AuditProgramEngagement>(`${this.resourceUrl}/${id}`);
  }

  create(
    auditProgramEngagement: AuditProgramEngagement
  ): Observable<AuditProgramEngagement> {
    return this.http.post<AuditProgramEngagement>(
      this.resourceUrl,
      auditProgramEngagement
    );
  }

  update(
    auditProgramEngagement: AuditProgramEngagement
  ): Observable<AuditProgramEngagement> {
    return this.http.put<AuditProgramEngagement>(
      `${this.resourceUrl}`,
      auditProgramEngagement
    );
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
