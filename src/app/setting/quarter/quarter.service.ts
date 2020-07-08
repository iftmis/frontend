import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Quarter } from './quarter';

@Injectable({
  providedIn: 'root',
})
export class QuarterService {
  private resourceUrl = 'api/quarters';

  constructor(private http: HttpClient) {}

  query(): Observable<Quarter[]> {
    return this.http
      .get<Quarter[]>(this.resourceUrl)
      .pipe(map((response: Quarter[]) => this.parseArrayResponse(response)));
  }

  getById(id: number): Observable<Quarter> {
    return this.http
      .get<Quarter>(`${this.resourceUrl}/${id}`)
      .pipe(map((quarter: Quarter) => this.parseResponse(quarter)));
  }

  create(quarter: Quarter): Observable<Quarter> {
    return this.http.post<Quarter>(this.resourceUrl, quarter);
  }

  update(quarter: Quarter): Observable<Quarter> {
    return this.http.put<Quarter>(`${this.resourceUrl}/${quarter.id}`, quarter);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }

  private parseArrayResponse(response: Quarter[]): Quarter[] {
    response.forEach((quarter: Quarter) => {
      this.parseResponse(quarter);
    });
    return response;
  }

  private parseResponse(quarter: Quarter): Quarter {
    quarter.startDate = new Date(quarter.startDate);
    quarter.endDate = new Date(quarter.endDate);
    return quarter;
  }
}
