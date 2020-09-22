import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InspectionFinding } from './inspection-finding';

@Injectable({
  providedIn: 'root',
})
export class InspectionFindingService {
  private resourceUrl = 'api/inspection-findings';

  constructor(private http: HttpClient) {}

  query(inspectionId: number, params?: any): Observable<InspectionFinding[]> {
    return this.http.get<InspectionFinding[]>(
      `${this.resourceUrl}/by-inspection/${inspectionId}`,
      { params: params }
    );
  }

  getById(id: number): Observable<InspectionFinding> {
    return this.http.get<InspectionFinding>(`${this.resourceUrl}/${id}`);
  }

  getByWorkDone(id: number): Observable<InspectionFinding> {
    return this.http.get<InspectionFinding>(
      `${this.resourceUrl}/by-work-done/${id}`
    );
  }

  create(inspectionFinding: InspectionFinding): Observable<InspectionFinding> {
    return this.http.post<InspectionFinding>(
      this.resourceUrl,
      inspectionFinding
    );
  }

  update(inspectionFinding: InspectionFinding): Observable<InspectionFinding> {
    return this.http.put<InspectionFinding>(
      `${this.resourceUrl}`,
      inspectionFinding
    );
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
