import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Briefing } from './Briefing';

@Injectable({
  providedIn: 'root',
})
export class BriefyingService {
  private resourceUrl = '/api/meetings';

  private resourceUrl1 = '/api/meetings/inspection';

  private uploadUrl = '/api/upload';

  constructor(private http: HttpClient) {}

  query(): Observable<Briefing[]> {
    return this.http.get<Briefing[]>(this.resourceUrl);
  }

  getById(id: number): Observable<Briefing> {
    return this.http.get<Briefing>(`${this.resourceUrl}/${id}`);
  }

  upload(formData: FormData) {
    return this.http.post<any>(this.uploadUrl, formData);
  }

  getByInspection(id: number): Observable<HttpResponse<Briefing[]>> {
    return this.http.get<Briefing[]>(
      `${this.resourceUrl}/by-inspection/${id}`,
      { observe: 'response' }
    );
  }

  getAllUnPaged(): Observable<Briefing[]> {
    return this.http.get<any>(this.resourceUrl1);
  }
  getByTypeAndInspeId(
    page: number,
    size: number,
    inspectionId: any,
    meetingType: string
  ): Observable<HttpResponse<Briefing[]>> {
    return this.http.get<Briefing[]>(
      `${this.resourceUrl1}/${inspectionId}/type/${meetingType}`,
      {
        observe: 'response',
      }
    );
  }

  create(briefying: Briefing): Observable<Briefing> {
    return this.http.post<Briefing>(this.resourceUrl, briefying);
  }

  update(row: Briefing): Observable<Briefing> {
    return this.http.put<Briefing>(`${this.resourceUrl}`, row);
  }

  // getByInspection(id: number): Observable<HttpResponse<Briefying[]>> {
  //   return this.http.get<Briefying[]>(
  //     `${this.resourceUrl}/by-inspection/${id}`,
  //     { observe: 'response' }
  //   );
  // }
  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
