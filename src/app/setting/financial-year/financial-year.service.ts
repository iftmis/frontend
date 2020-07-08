import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createRequestOption } from '../../shared/pagination.constants';
import { FinancialYear } from './financial-year';

@Injectable({
  providedIn: 'root',
})
export class FinancialYearService {
  private resourceUrl = 'api/financial-years';

  constructor(private http: HttpClient) {}

  getAll(req?: any): Observable<HttpResponse<FinancialYear[]>> {
    const options = createRequestOption(req);
    return this.http.get<FinancialYear[]>(this.resourceUrl + '/page', {
      params: options,
      observe: 'response',
    });
  }

  getAllUnPaged(): Observable<FinancialYear[]> {
    return this.http.get<any>(this.resourceUrl);
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

  update(row: FinancialYear): Observable<FinancialYear> {
    return this.http.put<FinancialYear>(`${this.resourceUrl}`, row);
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
