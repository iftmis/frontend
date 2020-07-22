import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InspectionProcedure } from './inspection-procedure';

@Injectable({
  providedIn: 'root',
})
export class InspectionProcedureService {
  private resourceUrl = 'api/inspection-procedures';

  constructor(private http: HttpClient) {}

  query(): Observable<InspectionProcedure[]> {
    return this.http.get<InspectionProcedure[]>(this.resourceUrl);
  }

  getById(id: number): Observable<InspectionProcedure> {
    return this.http.get<InspectionProcedure>(`${this.resourceUrl}/${id}`);
  }

  create(
    inspectionProcedure: InspectionProcedure
  ): Observable<InspectionProcedure> {
    return this.http.post<InspectionProcedure>(
      this.resourceUrl,
      inspectionProcedure
    );
  }

  update(
    inspectionProcedure: InspectionProcedure
  ): Observable<InspectionProcedure> {
    return this.http.put<InspectionProcedure>(
      `${this.resourceUrl}`,
      inspectionProcedure
    );
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
