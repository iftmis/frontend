import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { OrganisationUnitLevel } from './organisation-unit-level';

@Injectable({
  providedIn: 'root',
})
export class OrganisationUnitLevelService {
  private resourceUrl = 'api/organisation-unit-levels';

  constructor(private http: HttpClient) {}

  query(): Observable<OrganisationUnitLevel[]> {
    return this.http.get<OrganisationUnitLevel[]>(this.resourceUrl);
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
