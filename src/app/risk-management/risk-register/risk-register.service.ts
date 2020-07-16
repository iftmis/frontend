import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RiskRegister } from './risk-register';

@Injectable({
  providedIn: 'root',
})
export class RiskRegisterService {
  private resourceUrl = 'api/risk-registers';

  constructor(private http: HttpClient) {}

  getAllUnPaged(): Observable<RiskRegister[]> {
    return this.http.get<any>(this.resourceUrl);
  }

  getAllPaged(
    page: number,
    size: number,
    financialYearId?: number,
    organisationUnitId?: number
  ): Observable<HttpResponse<RiskRegister[]>> {
    return this.http.get<RiskRegister[]>(this.resourceUrl + '/page', {
      params: {
        page: `${page}`,
        size: `${size}`,
        financialYearId: `${financialYearId}`,
        organisationUnitId: `${organisationUnitId}`,
      },
      observe: 'response',
    });
  }

  getById(id: number): Observable<RiskRegister> {
    return this.http.get<RiskRegister>(`${this.resourceUrl}/${id}`);
  }

  create(riskRegister: RiskRegister): Observable<RiskRegister> {
    return this.http.post<RiskRegister>(this.resourceUrl, riskRegister);
  }

  update(riskRegister: RiskRegister): Observable<RiskRegister> {
    return this.http.put<RiskRegister>(`${this.resourceUrl}`, riskRegister);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
