import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Indicator } from './indicator';

@Injectable({
  providedIn: 'root',
})
export class IndicatorService {
  private resourceUrl = 'api/indicators';

  constructor(private http: HttpClient) {}

  getAllPaged(): Observable<Indicator[]> {
    return this.http.get<Indicator[]>(this.resourceUrl);
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
