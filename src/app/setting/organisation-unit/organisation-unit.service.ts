import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { OrganisationUnit } from './organisation-unit';
import { createRequestOption } from '../../shared/pagination.constants';

@Injectable({
  providedIn: 'root',
})
export class OrganisationUnitService {
  private resourceUrl = 'api/organisation-units';

  constructor(private http: HttpClient) {}

  getAllCouncils(queryString = '_'): Observable<OrganisationUnit[]> {
    return this.http.get<any>(this.resourceUrl + '/councils');
  }

  getAllPaged(
    page: number,
    size: number,
    sortBy = 'id',
    queryString = '_'
  ): Observable<any> {
    return this.http.get<any>(this.resourceUrl + '/page', {
      params: {
        page: `${page}`,
        size: `${size}`,
        query: `${queryString}`,
        sortBy: `${sortBy}`,
      },
    });
  }

  query(req?: any): Observable<HttpResponse<OrganisationUnit[]>> {
    const options = createRequestOption(req);
    return this.http.get<OrganisationUnit[]>(this.resourceUrl, {
      params: options,
      observe: 'response',
    });
  }

  getPage(req?: any): Observable<HttpResponse<OrganisationUnit[]>> {
    const options = createRequestOption(req);
    return this.http.get<OrganisationUnit[]>(`${this.resourceUrl}/page`, {
      params: options,
      observe: 'response',
    });
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
