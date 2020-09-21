import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InspectionBudget } from './inspection-budget';

@Injectable({
  providedIn: 'root',
})
export class InspectionBudgetService {
  private resourceUrl = 'api/inspection-budgets';

  constructor(private http: HttpClient) {}

  query(): Observable<InspectionBudget[]> {
    return this.http.get<InspectionBudget[]>(this.resourceUrl);
  }

  getById(id: number): Observable<InspectionBudget> {
    return this.http.get<InspectionBudget>(`${this.resourceUrl}/${id}`);
  }

  getByInspection(inspectionId: number): Observable<InspectionBudget[]> {
    return this.http.get<InspectionBudget[]>(
      `${this.resourceUrl}/by-inspection/${inspectionId}`
    );
  }

  create(inspectionBudget: InspectionBudget): Observable<InspectionBudget> {
    return this.http.post<InspectionBudget>(this.resourceUrl, inspectionBudget);
  }

  update(inspectionBudget: InspectionBudget): Observable<InspectionBudget> {
    return this.http.put<InspectionBudget>(
      `${this.resourceUrl}`,
      inspectionBudget
    );
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
