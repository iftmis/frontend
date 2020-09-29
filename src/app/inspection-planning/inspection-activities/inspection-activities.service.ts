import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InspectionActivities } from './inspection-activities';
import { createRequestOption } from '../../shared/pagination.constants';

@Injectable({
  providedIn: 'root',
})
export class InspectionActivitiesService {
  private resourceUrl = 'api/inspection-activities';

  constructor(private http: HttpClient) {}

  query(req?: any): Observable<HttpResponse<InspectionActivities[]>> {
    const options = createRequestOption(req);

    return this.http.get<InspectionActivities[]>(this.resourceUrl, {
      params: options,
      observe: 'response',
    });
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
      `${this.resourceUrl}`,
      inspectionActivities
    );
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
