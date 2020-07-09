import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Quarter } from './quarter';
import { createRequestOption } from '../../shared/pagination.constants';
import { FinancialYear } from '../financial-year/financial-year';

@Injectable({
  providedIn: 'root',
})
export class QuarterService {
  private resourceUrl = 'api/quarters';

  constructor(private http: HttpClient) {}

  query(req?: any): Observable<HttpResponse<Quarter[]>> {
    const options = createRequestOption(req);
    return this.http.get<Quarter[]>(this.resourceUrl, {
      params: options,
      observe: 'response',
    });
  }

  getById(id: number): Observable<Quarter> {
    return this.http
      .get<Quarter>(`${this.resourceUrl}/${id}`)
      .pipe(map((quarter: Quarter) => this.parseResponse(quarter)));
  }

  create(quarter: Quarter): Observable<Quarter> {
    return this.http.post<Quarter>(this.resourceUrl, quarter);
  }

  update(row: Quarter): Observable<Quarter> {
    return this.http.put<Quarter>(`${this.resourceUrl}`, row);
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
