import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InspectionPlan } from './inspection-plan';

@Injectable({
  providedIn: 'root',
})
export class InspectionPlanService {
  private resourceUrl = 'api/inspection-plans';

  constructor(private http: HttpClient) {}

  query(): Observable<InspectionPlan[]> {
    return this.http.get<InspectionPlan[]>(this.resourceUrl);
  }

  getById(id: number): Observable<InspectionPlan> {
    return this.http.get<InspectionPlan>(`${this.resourceUrl}/${id}`);
  }

  create(inspectionPlan: InspectionPlan): Observable<InspectionPlan> {
    return this.http.post<InspectionPlan>(this.resourceUrl, inspectionPlan);
  }

  update(inspectionPlan: InspectionPlan): Observable<InspectionPlan> {
    return this.http.put<InspectionPlan>(
      `${this.resourceUrl}/${inspectionPlan.id}`,
      inspectionPlan
    );
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
