import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Indicator } from './indicator';
import { SubArea } from '../sub-area/sub-area';

@Injectable({
  providedIn: 'root',
})
export class IndicatorService {
  private resourceUrl = 'api/indicators';

  constructor(private http: HttpClient) {}

  getAllUnPaged(): Observable<Indicator[]> {
    return this.http.get<any>(this.resourceUrl);
  }

  getAllPaged(
    page: number,
    size: number,
    subAreaId: number
  ): Observable<HttpResponse<Indicator[]>> {
    return this.http.get<Indicator[]>(this.resourceUrl + '/page', {
      params: {
        page: `${page}`,
        size: `${size}`,
        subAreaId: `${subAreaId}`,
      },
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
