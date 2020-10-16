import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Briefying } from './Briefying';

@Injectable({
  providedIn: 'root',
})
export class BriefyingService {
  private resourceUrl = '/api/meetings';

  private resourceUrl1 = '/api/meetings/inspection';

  private uploadUrl = '/api/upload';

  constructor(private http: HttpClient) {}

  query(): Observable<Briefying[]> {
    return this.http.get<Briefying[]>(this.resourceUrl);
  }

  getById(id: number): Observable<Briefying> {
    return this.http.get<Briefying>(`${this.resourceUrl}/${id}`);
  }

  upload(formData: FormData) {
    return this.http.post<any>(this.uploadUrl, formData);
  }

  getByInspection(id: number): Observable<HttpResponse<Briefying[]>> {
    return this.http.get<Briefying[]>(
      `${this.resourceUrl}/by-inspection/${id}`,
      { observe: 'response' }
    );
  }

  getAllUnPaged(): Observable<Briefying[]> {
    return this.http.get<any>(this.resourceUrl1);
  }
  getByTypeAndInspeId(
    page: number,
    size: number,
    inspectionId: any,
    meetingType: string
  ): Observable<HttpResponse<Briefying[]>> {
    return this.http.get<Briefying[]>(
      `${this.resourceUrl1}/${inspectionId}/type/${meetingType}`,
      {
        observe: 'response',
      }
    );
  }

  create(briefying: Briefying): Observable<Briefying> {
    return this.http.post<Briefying>(this.resourceUrl, briefying);
  }

  update(row: Briefying): Observable<Briefying> {
    return this.http.put<Briefying>(`${this.resourceUrl}`, row);
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
