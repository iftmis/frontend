import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { OrganisationUnitLevel } from './organisation-unit-level';
import { createRequestOption } from '../../shared/pagination.constants';
import { AuditableArea } from '../auditable-area/auditable-area';

// @ts-ignore
@Injectable({
  providedIn: 'root',
})
export class OrganisationUnitLevelService {
  private resourceUrl = 'api/organisation-unit-levels';

  constructor(private http: HttpClient) {}

  query(req?: any): Observable<HttpResponse<OrganisationUnitLevel[]>> {
    const options = createRequestOption(req);
    return this.http.get<OrganisationUnitLevel[]>(this.resourceUrl, {
      params: options,
      observe: 'response',
    });
  }

  getById(id: number): Observable<OrganisationUnitLevel> {
    return this.http.get<OrganisationUnitLevel>(`${this.resourceUrl}/${id}`);
  }

  create(
    organisationUnitLevel: OrganisationUnitLevel
  ): Observable<OrganisationUnitLevel> {
    return this.http.post<OrganisationUnitLevel>(
      this.resourceUrl,
      organisationUnitLevel
    );
  }

  update(
    organisationUnitLevel: OrganisationUnitLevel
  ): Observable<OrganisationUnitLevel> {
    return this.http.put<OrganisationUnitLevel>(
      `${this.resourceUrl}`,
      organisationUnitLevel
    );
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
