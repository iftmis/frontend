import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from '../../shared/pagination.constants';
import { Indicator } from './indicator';

@Injectable({
  providedIn: 'root',
})
export class IndicatorService {
  private resourceUrl = 'api/indicators';

  constructor(private http: HttpClient) {}

  getAllUnPaged(): Observable<Indicator[]> {
    return this.http.get<any>(this.resourceUrl);
  }

  getAllPaged(req?: any): Observable<HttpResponse<Indicator[]>> {
    const options = createRequestOption(req);
    return this.http.get<Indicator[]>(this.resourceUrl + '/page', {
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
