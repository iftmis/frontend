import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Courtesy } from './courtesy';

@Injectable({
  providedIn: 'root',
})
export class CourtesyService {
  private resourceUrl = '/api/meetings';
  private uploadUrl = '/api/upload';
  constructor(private http: HttpClient) {}

  query(): Observable<Courtesy[]> {
    return this.http.get<Courtesy[]>(this.resourceUrl);
  }

  upload(formData: FormData) {
    return this.http.post<any>(this.uploadUrl, formData);
  }

  getByInspection(id: number): Observable<HttpResponse<Courtesy[]>> {
    return this.http.get<Courtesy[]>(
      `${this.resourceUrl}/by-inspection/${id}`,
      { observe: 'response' }
    );
  }
  create(courtesy: Courtesy): Observable<Courtesy> {
    return this.http.post<Courtesy>(this.resourceUrl, courtesy);
  }

  update(row: Courtesy): Observable<Courtesy> {
    return this.http.put<Courtesy>(`${this.resourceUrl}`, row);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
