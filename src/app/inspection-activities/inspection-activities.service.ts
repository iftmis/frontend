import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InspectionActivities } from './inspection-activities';

@Injectable({
  providedIn: 'root',
})
export class InspectionActivitiesService {
  private resourceUrl = 'api/inspection-activities';

  constructor(private http: HttpClient) {}

  query(): Observable<InspectionActivities[]> {
    return this.http.get<InspectionActivities[]>(this.resourceUrl);
  }

  getById(id: number): Observable<InspectionActivities> {
    return this.http.get<InspectionActivities>(`${this.resourceUrl}/${id}`);
  }

  create(
    inspectionActivities: InspectionActivities
  ): Observable<InspectionActivities> {
    return this.http.post<InspectionActivities>(
      this.resourceUrl,
      inspectionActivities
    );
  }

  update(
    inspectionActivities: InspectionActivities
  ): Observable<InspectionActivities> {
    return this.http.put<InspectionActivities>(
      `${this.resourceUrl}/${inspectionActivities.id}`,
      inspectionActivities
    );
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
