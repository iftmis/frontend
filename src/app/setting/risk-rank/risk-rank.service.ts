import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RiskRank } from './risk-rank';

@Injectable({
  providedIn: 'root',
})
export class RiskRankService {
  private resourceUrl = 'api/risk-ranks';

  constructor(private http: HttpClient) {}

  query(): Observable<RiskRank[]> {
    return this.http.get<RiskRank[]>(this.resourceUrl);
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
