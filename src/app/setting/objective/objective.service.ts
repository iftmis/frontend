import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Objective } from './objective';
import { AuditableArea } from '../auditable-area/auditable-area';
import { createRequestOption } from '../../shared/pagination.constants';
import { GfsCode } from '../gfs-code/gfs-code';

@Injectable({
  providedIn: 'root',
})
export class ObjectiveService {
  private resourceUrl = 'api/objectives';

  constructor(private http: HttpClient) {}

  getAllUnPaged(): Observable<Objective[]> {
    return this.http.get<any>(this.resourceUrl);
  }

  getAllPaged(req?: any): Observable<HttpResponse<Objective[]>> {
    const options = createRequestOption(req);
    return this.http.get<Objective[]>(this.resourceUrl + '/page', {
      params: options,
      observe: 'response',
    });
  }

  getById(id: number): Observable<Objective> {
    return this.http.get<Objective>(`${this.resourceUrl}/${id}`);
  }

  create(objective: Objective): Observable<Objective> {
    return this.http.post<Objective>(this.resourceUrl, objective);
  }

  update(objective: Objective): Observable<Objective> {
    return this.http.put<Objective>(`${this.resourceUrl}`, objective);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
