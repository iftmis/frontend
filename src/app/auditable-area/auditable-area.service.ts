import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuditableArea } from './auditable-area';

@Injectable({
  providedIn: 'root',
})
export class AuditableAreaService {
  private resourceUrl = 'api/auditable-areas';

  constructor(private http: HttpClient) {}

  query(): Observable<AuditableArea[]> {
    return this.http.get<AuditableArea[]>(this.resourceUrl);
  }

  getById(id: number): Observable<AuditableArea> {
    return this.http.get<AuditableArea>(`${this.resourceUrl}/${id}`);
  }

  create(auditableArea: AuditableArea): Observable<AuditableArea> {
    return this.http.post<AuditableArea>(this.resourceUrl, auditableArea);
  }

  update(auditableArea: AuditableArea): Observable<AuditableArea> {
    return this.http.put<AuditableArea>(`${this.resourceUrl}`, auditableArea);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
