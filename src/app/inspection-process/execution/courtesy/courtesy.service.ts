import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Courtesy } from './courtesy';

@Injectable({
  providedIn: 'root',
})
export class CourtesyService {
  private resourceUrl = '';
  constructor(private http: HttpClient) {}

  query(): Observable<Courtesy[]> {
    return this.http.get<Courtesy[]>(this.resourceUrl);
  }

  getByInspection(id: number): Observable<HttpResponse<Courtesy[]>> {
    return this.http.get<Courtesy[]>(
      `${this.resourceUrl}/by-inspection/${id}`,
      { observe: 'response' }
    );
  }
  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
