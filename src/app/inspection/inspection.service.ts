import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Inspection } from './inspection';

@Injectable({
  providedIn: 'root',
})
export class InspectionService {
  private resourceUrl = 'api/inspections';
  // private resourceUrlTwo = 'api/inspections/by-ou';
  private resourceThree = ' /inspections/by/organisation-unit';
  constructor(private http: HttpClient) {}

  query(
    fyId: number,
    type: string,
    ouId: number,
    params: any
  ): Observable<Inspection[]> {
    return this.http
      .get<Inspection[]>(
        `${this.resourceThree}/${ouId}/financial-year/${fyId}`,
        {
          params,
        }
      )
      .pipe(map((response: Inspection[]) => this.parseArrayResponse(response)));
  }

  getById(id: number): Observable<Inspection> {
    return this.http
      .get<Inspection>(`${this.resourceUrl}/${id}`)
      .pipe(map((inspection: Inspection) => this.parseResponse(inspection)));
  }

  create(inspection: Inspection): Observable<Inspection> {
    return this.http.post<Inspection>(this.resourceUrl, inspection);
  }

  update(inspection: Inspection): Observable<Inspection> {
    return this.http.put<Inspection>(`${this.resourceUrl}`, inspection);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }

  private parseArrayResponse(response: Inspection[]): Inspection[] {
    response.forEach((inspection: Inspection) => {
      this.parseResponse(inspection);
    });
    return response;
  }

  private parseResponse(inspection: Inspection): Inspection {
    inspection.startDate = new Date(inspection.startDate!);
    inspection.endDate = new Date(inspection.endDate!);
    return inspection;
  }
}
