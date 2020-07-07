import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GfsCode } from './gfs-code';

@Injectable({
  providedIn: 'root',
})
export class GfsCodeService {
  private resourceUrl = 'api/gfs-codes';

  constructor(private http: HttpClient) {}

  query(): Observable<GfsCode[]> {
    return this.http.get<GfsCode[]>(this.resourceUrl);
  }

  getById(id: number): Observable<GfsCode> {
    return this.http.get<GfsCode>(`${this.resourceUrl}/${id}`);
  }

  create(gfsCode: GfsCode): Observable<GfsCode> {
    return this.http.post<GfsCode>(this.resourceUrl, gfsCode);
  }

  update(gfsCode: GfsCode): Observable<GfsCode> {
    return this.http.put<GfsCode>(`${this.resourceUrl}`, gfsCode);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
