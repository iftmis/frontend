import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FindingResponse } from './finding-response';

@Injectable({
  providedIn: 'root',
})
export class FindingResponseService {
  private resourceUrl = 'api/finding-responses';

  constructor(private http: HttpClient) {}

  public getAll(recommendationId: number): Observable<FindingResponse[]> {
    return this.http.get<FindingResponse[]>(this.resourceUrl, {
      params: {
        recommendationId: `${recommendationId}`,
      },
    }) as Observable<FindingResponse[]>;
  }

  getAllPaged(
    page: number,
    size: number,
    recommendationId: number
  ): Observable<HttpResponse<FindingResponse[]>> {
    return this.http.get<FindingResponse[]>(this.resourceUrl + '/page', {
      params: {
        page: `${page}`,
        size: `${size}`,
        recommendationId: `${recommendationId}`,
      },
      observe: 'response',
    });
  }

  getById(id: number): Observable<FindingResponse> {
    return this.http.get<FindingResponse>(`${this.resourceUrl}/${id}`);
  }

  create(finding: FindingResponse): Observable<FindingResponse> {
    return this.http.post<FindingResponse>(this.resourceUrl, finding);
  }

  update(finding: FindingResponse): Observable<FindingResponse> {
    return this.http.put<FindingResponse>(`${this.resourceUrl}`, finding);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
