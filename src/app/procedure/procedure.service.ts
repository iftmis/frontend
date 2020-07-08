import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Procedure } from './procedure';

@Injectable({
  providedIn: 'root',
})
export class ProcedureService {
  private resourceUrl = 'api/procedures';

  constructor(private http: HttpClient) {}

  query(): Observable<Procedure[]> {
    return this.http.get<Procedure[]>(this.resourceUrl);
  }

  getById(id: number): Observable<Procedure> {
    return this.http.get<Procedure>(`${this.resourceUrl}/${id}`);
  }

  create(procedure: Procedure): Observable<Procedure> {
    return this.http.post<Procedure>(this.resourceUrl, procedure);
  }

  update(procedure: Procedure): Observable<Procedure> {
    return this.http.put<Procedure>(`${this.resourceUrl}`, procedure);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
