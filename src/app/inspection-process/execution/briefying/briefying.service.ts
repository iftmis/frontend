import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Briefying } from './Briefying';

@Injectable({
  providedIn: 'root',
})
export class BriefyingService {
  private resourceUrl = '';
  constructor(private http: HttpClient) {}

  getById(id: number): Observable<Briefying> {
    return this.http.get<Briefying>(`${this.resourceUrl}/${id}`);
  }

  create(briefying: Briefying): Observable<Briefying> {
    return this.http.post<Briefying>(this.resourceUrl, briefying);
  }

  update(briefying: Briefying): Observable<Briefying> {
    return this.http.put<Briefying>(`${this.resourceUrl}`, briefying);
  }

  query(): Observable<Briefying[]> {
    return this.http.get<Briefying[]>(this.resourceUrl);
  }

  getByInspection(id: number): Observable<HttpResponse<Briefying[]>> {
    return this.http.get<Briefying[]>(
      `${this.resourceUrl}/by-inspection/${id}`,
      { observe: 'response' }
    );
  }
  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
