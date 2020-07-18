import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InspectionObjective } from './inspection-objective';

@Injectable({
  providedIn: 'root',
})
export class InspectionObjectiveService {
  private resourceUrl = 'api/inspection-objectives';

  constructor(private http: HttpClient) {}

  query(): Observable<InspectionObjective[]> {
    return this.http.get<InspectionObjective[]>(this.resourceUrl);
  }

  getById(id: number): Observable<InspectionObjective> {
    return this.http.get<InspectionObjective>(`${this.resourceUrl}/${id}`);
  }

  create(
    inspectionObjective: InspectionObjective
  ): Observable<InspectionObjective> {
    return this.http.post<InspectionObjective>(
      this.resourceUrl,
      inspectionObjective
    );
  }

  update(
    inspectionObjective: InspectionObjective
  ): Observable<InspectionObjective> {
    return this.http.put<InspectionObjective>(
      `${this.resourceUrl}`,
      inspectionObjective
    );
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
