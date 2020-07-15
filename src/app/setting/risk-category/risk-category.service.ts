import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RiskCategory } from './risk-category';

@Injectable({
  providedIn: 'root',
})
export class RiskCategoryService {
  private resourceUrl = 'api/risk-categories';

  constructor(private http: HttpClient) {}

  getAllUnPaged(): Observable<RiskCategory[]> {
    return this.http.get<any>(this.resourceUrl);
  }

  getAllPaged(
    page: number,
    size: number
  ): Observable<HttpResponse<RiskCategory[]>> {
    return this.http.get<RiskCategory[]>(this.resourceUrl + '/page', {
      params: {
        page: `${page}`,
        size: `${size}`,
      },
      observe: 'response',
    });
  }

  getById(id: number): Observable<RiskCategory> {
    return this.http.get<RiskCategory>(`${this.resourceUrl}/${id}`);
  }

  create(riskCategory: RiskCategory): Observable<RiskCategory> {
    return this.http.post<RiskCategory>(this.resourceUrl, riskCategory);
  }

  update(riskCategory: RiskCategory): Observable<RiskCategory> {
    return this.http.put<RiskCategory>(`${this.resourceUrl}`, riskCategory);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
