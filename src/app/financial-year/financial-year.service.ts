import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FinancialYear } from './financial-year';

@Injectable({
  providedIn: 'root',
})
export class FinancialYearService {
  private resourceUrl = 'api/financial-years';

  constructor(private http: HttpClient) {}

  query(): Observable<FinancialYear[]> {
    return this.http
      .get<FinancialYear[]>(this.resourceUrl)
      .pipe(
        map((response: FinancialYear[]) => this.parseArrayResponse(response))
      );
  }

  getAll(page: number, size: number): Observable<any> {
    return this.http.get<any>(this.resourceUrl, {
      params: {
        page: `${page}`,
        size: `${size}`,
      },
    });
  }

  getById(id: number): Observable<FinancialYear> {
    return this.http
      .get<FinancialYear>(`${this.resourceUrl}/${id}`)
      .pipe(
        map((financialYear: FinancialYear) => this.parseResponse(financialYear))
      );
  }

  create(financialYear: FinancialYear): Observable<FinancialYear> {
    return this.http.post<FinancialYear>(this.resourceUrl, financialYear);
  }

  update(financialYear: FinancialYear): Observable<FinancialYear> {
    return this.http.put<FinancialYear>(
      `${this.resourceUrl}/${financialYear.id}`,
      financialYear
    );
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }

  private parseArrayResponse(response: FinancialYear[]): FinancialYear[] {
    response.forEach((financialYear: FinancialYear) => {
      this.parseResponse(financialYear);
    });
    return response;
  }

  private parseResponse(financialYear: FinancialYear): FinancialYear {
    financialYear.startDate = new Date(financialYear.startDate);
    return financialYear;
  }
}
