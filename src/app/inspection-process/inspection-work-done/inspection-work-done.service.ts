import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InspectionWorkDone } from './inspection-work-done';

@Injectable({
  providedIn: 'root',
})
export class InspectionWorkDoneService {
  private resourceUrl = 'api/inspection-work-dones';

  constructor(private http: HttpClient) {}

  query(): Observable<InspectionWorkDone[]> {
    return this.http.get<InspectionWorkDone[]>(this.resourceUrl);
  }

  getById(id: number): Observable<InspectionWorkDone> {
    return this.http.get<InspectionWorkDone>(`${this.resourceUrl}/${id}`);
  }

  getByProcedure(procedureId: number): Observable<InspectionWorkDone[]> {
    return this.http.get<InspectionWorkDone[]>(
      `${this.resourceUrl}/by-procedure/${procedureId}`
    );
  }

  create(
    inspectionWorkDone: InspectionWorkDone
  ): Observable<InspectionWorkDone> {
    return this.http.post<InspectionWorkDone>(
      this.resourceUrl,
      inspectionWorkDone
    );
  }

  update(
    inspectionWorkDone: InspectionWorkDone
  ): Observable<InspectionWorkDone> {
    return this.http.put<InspectionWorkDone>(
      `${this.resourceUrl}/${inspectionWorkDone.id}`,
      inspectionWorkDone
    );
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
