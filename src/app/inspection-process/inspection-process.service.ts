import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InspectionProcessService {
  private resourceUrl = 'api/inspection-stages';

  constructor(private http: HttpClient) {}

  getOne(inspectionId: number, name: string): Observable<any> {
    return this.http.get<any>(`${this.resourceUrl}/${inspectionId}/${name}`);
  }

  approve(id: number): Observable<any> {
    return this.http.get<any>(`${this.resourceUrl}/approve/${id}`);
  }
}
