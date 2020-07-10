import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { OrganisationUnit } from './organisation-unit';

@Injectable({
  providedIn: 'root',
})
export class OrganisationUnitService {
  private resourceUrl = 'api/organisation-units';

  constructor(private http: HttpClient) {}

  query(): Observable<OrganisationUnit[]> {
    return this.http.get<OrganisationUnit[]>(this.resourceUrl);
  }

  getById(id: number): Observable<OrganisationUnit> {
    return this.http.get<OrganisationUnit>(`${this.resourceUrl}/${id}`);
  }

  getByUser(): Observable<OrganisationUnit[]> {
    return this.http.get<OrganisationUnit[]>(`${this.resourceUrl}/by-user`);
  }

  getByParent(parentId: number): Observable<OrganisationUnit[]> {
    return this.http.get<OrganisationUnit[]>(
      `${this.resourceUrl}/by-parent/${parentId}`
    );
  }

  create(organisationUnit: OrganisationUnit): Observable<OrganisationUnit> {
    return this.http.post<OrganisationUnit>(this.resourceUrl, organisationUnit);
  }

  update(organisationUnit: OrganisationUnit): Observable<OrganisationUnit> {
    return this.http.put<OrganisationUnit>(
      `${this.resourceUrl}`,
      organisationUnit
    );
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
