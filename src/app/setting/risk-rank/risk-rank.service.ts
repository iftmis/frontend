import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RiskRank } from './risk-rank';

@Injectable({
  providedIn: 'root',
})
export class RiskRankService {
  private resourceUrl = 'api/risk-ranks';

  constructor(private http: HttpClient) {}

  getAllUnPaged(): Observable<RiskRank[]> {
    return this.http.get<any>(this.resourceUrl);
  }

  getAllPaged(
    page: number,
    size: number
  ): Observable<HttpResponse<RiskRank[]>> {
    return this.http.get<RiskRank[]>(this.resourceUrl + '/page', {
      params: {
        page: `${page}`,
        size: `${size}`,
      },
      observe: 'response',
    });
  }

  getById(id: number): Observable<RiskRank> {
    return this.http.get<RiskRank>(`${this.resourceUrl}/${id}`);
  }

  create(riskRank: RiskRank): Observable<RiskRank> {
    return this.http.post<RiskRank>(this.resourceUrl, riskRank);
  }

  update(riskRank: RiskRank): Observable<RiskRank> {
    return this.http.put<RiskRank>(`${this.resourceUrl}`, riskRank);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
