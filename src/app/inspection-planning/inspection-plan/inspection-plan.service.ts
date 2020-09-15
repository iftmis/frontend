import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InspectionPlan } from './inspection-plan';
import { createRequestOption } from '../../shared/pagination.constants';
import { GfsCode } from '../../setting/gfs-code/gfs-code';

@Injectable({
  providedIn: 'root',
})
export class InspectionPlanService {
  private resourceUrl = 'api/inspection-plans';

  constructor(private http: HttpClient) {}

  query(): Observable<InspectionPlan[]> {
    return this.http.get<InspectionPlan[]>(this.resourceUrl);
  }

  getAllPaged(req?: any): Observable<HttpResponse<InspectionPlan[]>> {
    const options = createRequestOption(req);
    return this.http.get<InspectionPlan[]>(this.resourceUrl, {
      params: options,
      observe: 'response',
    });
  }

  getById(id: number): Observable<InspectionPlan> {
    return this.http.get<InspectionPlan>(`${this.resourceUrl}/${id}`);
  }

  create(inspectionPlan: InspectionPlan): Observable<InspectionPlan> {
    return this.http.post<InspectionPlan>(this.resourceUrl, inspectionPlan);
  }

  update(inspectionPlan: InspectionPlan): Observable<InspectionPlan> {
    return this.http.put<InspectionPlan>(`${this.resourceUrl}`, inspectionPlan);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
