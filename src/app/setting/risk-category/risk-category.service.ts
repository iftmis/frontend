import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RiskCategory } from './risk-category';
import { createRequestOption } from '../../shared/pagination.constants';

@Injectable({
  providedIn: 'root',
})
export class RiskCategoryService {
  private resourceUrl = 'api/risk-categories';

  constructor(private http: HttpClient) {}

  query(req?: any): Observable<HttpResponse<RiskCategory[]>> {
    const options = createRequestOption(req);
    return this.http.get<RiskCategory[]>(this.resourceUrl, {
      params: options,
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
