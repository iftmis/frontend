import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InspectionArea } from './inspection-area';

@Injectable({
  providedIn: 'root',
})
export class InspectionAreaService {
  private resourceUrl = 'api/inspection-areas';

  constructor(private http: HttpClient) {}

  query(): Observable<InspectionArea[]> {
    return this.http.get<InspectionArea[]>(this.resourceUrl);
  }

  getByInspection(id: number): Observable<InspectionArea[]> {
    return this.http.get<InspectionArea[]>(
      `${this.resourceUrl}/by-inspection/${id}`,
      {}
    );
  }

  getWithObjectives(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.resourceUrl}/by-inspection/${id}/with-objectives`,
      {}
    );
  }

  getById(id: number): Observable<InspectionArea> {
    return this.http.get<InspectionArea>(`${this.resourceUrl}/${id}`);
  }

  create(inspectionArea: InspectionArea): Observable<InspectionArea> {
    return this.http.post<InspectionArea>(this.resourceUrl, inspectionArea);
  }
  saveAll(inspectionAreasToAdd: any): Observable<any> {
    return this.http.post<InspectionArea[]>(
      `${this.resourceUrl}/add`,
      inspectionAreasToAdd
    );
  }

  removeAll(inAreas: InspectionArea[]) {
    return this.http.post<InspectionArea[]>(
      `${this.resourceUrl}/remove`,
      inAreas
    );
  }

  update(inspectionArea: InspectionArea): Observable<InspectionArea> {
    return this.http.put<InspectionArea>(`${this.resourceUrl}`, inspectionArea);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
