import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InspectionIndicator } from './inspection-indicator';

@Injectable({
  providedIn: 'root',
})
export class InspectionIndicatorService {
  private resourceUrl = 'api/inspection-indicators';

  constructor(private http: HttpClient) {}

  query(): Observable<InspectionIndicator[]> {
    return this.http.get<InspectionIndicator[]>(this.resourceUrl);
  }

  getById(id: number): Observable<InspectionIndicator> {
    return this.http.get<InspectionIndicator>(`${this.resourceUrl}/${id}`);
  }

  getByInspectionSubArea(
    inspectionSubAreaId: number
  ): Observable<InspectionIndicator[]> {
    return this.http.get<InspectionIndicator[]>(
      `${this.resourceUrl}/by-inspection-sub-area/${inspectionSubAreaId}`
    );
  }

  create(
    inspectionIndicator: InspectionIndicator
  ): Observable<InspectionIndicator> {
    return this.http.post<InspectionIndicator>(
      this.resourceUrl,
      inspectionIndicator
    );
  }

  update(
    inspectionIndicator: InspectionIndicator
  ): Observable<InspectionIndicator> {
    return this.http.put<InspectionIndicator>(
      `${this.resourceUrl}`,
      inspectionIndicator
    );
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
