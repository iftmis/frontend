import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FindingRecommendation } from './recommendation';

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  private resourceUrl = 'api/finding-recommendations';

  constructor(private http: HttpClient) {}

  public getAll(findingId: number): Observable<FindingRecommendation[]> {
    return this.http.get<FindingRecommendation[]>(this.resourceUrl, {
      params: {
        findingId: `${findingId}`,
      },
    }) as Observable<FindingRecommendation[]>;
  }

  getAllPaged(
    page: number,
    size: number,
    findingId: number
  ): Observable<HttpResponse<FindingRecommendation[]>> {
    return this.http.get<FindingRecommendation[]>(this.resourceUrl + '/page', {
      params: {
        page: `${page}`,
        size: `${size}`,
        findingId: `${findingId}`,
      },
      observe: 'response',
    });
  }

  getById(id: number): Observable<FindingRecommendation> {
    return this.http.get<FindingRecommendation>(`${this.resourceUrl}/${id}`);
  }

  create(finding: FindingRecommendation): Observable<FindingRecommendation> {
    return this.http.post<FindingRecommendation>(this.resourceUrl, finding);
  }

  update(finding: FindingRecommendation): Observable<FindingRecommendation> {
    return this.http.put<FindingRecommendation>(`${this.resourceUrl}`, finding);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
