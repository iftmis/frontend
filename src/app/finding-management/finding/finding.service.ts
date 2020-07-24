import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Finding, FindingSource } from './finding';

@Injectable({
  providedIn: 'root',
})
export class FindingService {
  private resourceUrl = 'api/findings';

  constructor(private http: HttpClient) {}

  public getAll(
    organisationUnitId: number,
    source: FindingSource
  ): Observable<Finding[]> {
    return this.http.get<Finding[]>(this.resourceUrl, {
      params: {
        organisationUnitId: `${organisationUnitId}`,
        source: `${source}`,
      },
    }) as Observable<Finding[]>;
  }

  getAllPaged(
    page: number,
    size: number,
    organisationUnitId: number,
    source: string
  ): Observable<HttpResponse<Finding[]>> {
    return this.http.get<Finding[]>(this.resourceUrl + '/page', {
      params: {
        page: `${page}`,
        size: `${size}`,
        organisationUnitId: `${organisationUnitId}`,
        source: `${source}`,
      },
      observe: 'response',
    });
  }

  getById(id: number): Observable<Finding> {
    return this.http.get<Finding>(`${this.resourceUrl}/${id}`);
  }

  create(finding: Finding): Observable<Finding> {
    return this.http.post<Finding>(this.resourceUrl, finding);
  }

  update(finding: Finding): Observable<Finding> {
    return this.http.put<Finding>(`${this.resourceUrl}`, finding);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }

  close(id: number) {
    return this.http.get(`${this.resourceUrl}/close/${id}`);
  }
}
