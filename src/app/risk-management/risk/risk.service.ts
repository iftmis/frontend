import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Risk } from './risk';
import { RiskRegister } from '../risk-register/risk-register';
import { AuditableArea } from '../../setting/auditable-area/auditable-area';
import { createRequestOption } from '../../shared/pagination.constants';

@Injectable({
  providedIn: 'root',
})
export class RiskService {
  private resourceUrl = 'api/risks';

  constructor(private http: HttpClient) {}

  query(): Observable<Risk[]> {
    return this.http.get<Risk[]>(this.resourceUrl);
  }

  getAllPaged(req?: any): Observable<HttpResponse<Risk[]>> {
    const options = createRequestOption(req);
    return this.http.get<Risk[]>(this.resourceUrl + '/page', {
      params: options,
      observe: 'response',
    });
  }

  getById(id: number): Observable<Risk> {
    return this.http.get<Risk>(`${this.resourceUrl}/${id}`);
  }

  create(risk: Risk): Observable<Risk> {
    return this.http.post<Risk>(this.resourceUrl, risk);
  }

  update(risk: Risk): Observable<Risk> {
    return this.http.put<Risk>(`${this.resourceUrl}`, risk);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
