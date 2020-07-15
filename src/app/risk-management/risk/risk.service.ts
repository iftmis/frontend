import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Risk } from './risk';

@Injectable({
  providedIn: 'root',
})
export class RiskService {
  private resourceUrl = 'api/risks';

  constructor(private http: HttpClient) {}

  query(): Observable<Risk[]> {
    return this.http.get<Risk[]>(this.resourceUrl);
  }

  getById(id: number): Observable<Risk> {
    return this.http.get<Risk>(`${this.resourceUrl}/${id}`);
  }

  create(risk: Risk): Observable<Risk> {
    return this.http.post<Risk>(this.resourceUrl, risk);
  }

  update(risk: Risk): Observable<Risk> {
    return this.http.put<Risk>(`${this.resourceUrl}/${risk.id}`, risk);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
