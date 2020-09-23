import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InspectionSubArea } from './inspection-sub-area';

@Injectable({
  providedIn: 'root',
})
export class InspectionSubAreaService {
  private resourceUrl = 'api/inspection-sub-areas';

  constructor(private http: HttpClient) {}

  query(): Observable<InspectionSubArea[]> {
    return this.http.get<InspectionSubArea[]>(this.resourceUrl);
  }

  getById(id: number): Observable<InspectionSubArea> {
    return this.http.get<InspectionSubArea>(`${this.resourceUrl}/${id}`);
  }

  create(inspectionSubArea: InspectionSubArea): Observable<InspectionSubArea> {
    return this.http.post<InspectionSubArea>(
      this.resourceUrl,
      inspectionSubArea
    );
  }

  update(inspectionSubArea: InspectionSubArea): Observable<InspectionSubArea> {
    return this.http.put<InspectionSubArea>(
      `${this.resourceUrl}`,
      inspectionSubArea
    );
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
