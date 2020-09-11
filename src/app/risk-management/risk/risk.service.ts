import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Risk } from './risk';
import { createRequestOption } from '../../shared/pagination.constants';
import { InspectionArea } from '../../inspection-process/preparation/inspection-area/inspection-area';

@Injectable({
  providedIn: 'root',
})
export class RiskService {
  private resourceUrl = 'api/risks';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Risk[]> {
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

  saveAll(risksToAdd: any): Observable<any> {
    return this.http.post<Risk[]>(`${this.resourceUrl}`, risksToAdd);
  }

  getByActivityId(id: number): Observable<Risk[]> {
    return this.http.get<Risk[]>(`${this.resourceUrl}/by-activity/${id}`, {});
  }

  removeAll(risks: Risk[]) {
    return this.http.post<Risk[]>(`${this.resourceUrl}/remove`, risks);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
