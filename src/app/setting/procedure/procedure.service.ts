import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from '../../shared/pagination.constants';
import { Procedure } from './procedure';

@Injectable({
  providedIn: 'root',
})
export class ProcedureService {
  private resourceUrl = 'api/procedures';

  constructor(private http: HttpClient) {}

  getAllUnPaged(): Observable<Procedure[]> {
    return this.http.get<any>(this.resourceUrl);
  }

  getAllPaged(req?: any): Observable<HttpResponse<Procedure[]>> {
    const options = createRequestOption(req);
    return this.http.get<Procedure[]>(this.resourceUrl + '/page', {
      params: options,
      observe: 'response',
    });
  }

  getById(id: number): Observable<Procedure> {
    return this.http.get<Procedure>(`${this.resourceUrl}/${id}`);
  }

  getByIndicator(indicatorId: number): Observable<Procedure[]> {
    return this.http.get<Procedure[]>(
      `${this.resourceUrl}/by-indicator/${indicatorId}`
    );
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
