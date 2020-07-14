import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InspectionMember } from './inspection-member';

@Injectable({
  providedIn: 'root',
})
export class InspectionMemberService {
  private resourceUrl = 'api/inspection-members';

  constructor(private http: HttpClient) {}

  query(): Observable<InspectionMember[]> {
    return this.http.get<InspectionMember[]>(this.resourceUrl);
  }

  getByInspection(id: number): Observable<HttpResponse<InspectionMember[]>> {
    return this.http.get<InspectionMember[]>(
      `${this.resourceUrl}/by-inspection/${id}`,
      { observe: 'response' }
    );
  }

  getById(id: number): Observable<InspectionMember> {
    return this.http.get<InspectionMember>(`${this.resourceUrl}/${id}`);
  }

  create(inspectionMember: InspectionMember): Observable<InspectionMember> {
    return this.http.post<InspectionMember>(this.resourceUrl, inspectionMember);
  }

  update(inspectionMember: InspectionMember): Observable<InspectionMember> {
    return this.http.put<InspectionMember>(
      `${this.resourceUrl}/${inspectionMember.id}`,
      inspectionMember
    );
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
