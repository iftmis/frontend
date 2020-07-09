import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Indicator } from './indicator';
import { OrganisationUnitLevel } from '../organisation-unit-level/organisation-unit-level';
import { createRequestOption } from '../../shared/pagination.constants';

@Injectable({
  providedIn: 'root',
})
export class IndicatorService {
  private resourceUrl = 'api/indicators';

  constructor(private http: HttpClient) {}

  // query(): Observable<Indicator[]> {
  //   return this.http.get<Indicator[]>(this.resourceUrl);
  // }

  query(req?: any): Observable<HttpResponse<Indicator[]>> {
    const options = createRequestOption(req);
    return this.http.get<Indicator[]>(this.resourceUrl, {
      params: options,
      observe: 'response',
    });
  }

  getById(id: number): Observable<Indicator> {
    return this.http.get<Indicator>(`${this.resourceUrl}/${id}`);
  }

  create(indicator: Indicator): Observable<Indicator> {
    return this.http.post<Indicator>(this.resourceUrl, indicator);
  }

  update(indicator: Indicator): Observable<Indicator> {
    return this.http.put<Indicator>(`${this.resourceUrl}`, indicator);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
