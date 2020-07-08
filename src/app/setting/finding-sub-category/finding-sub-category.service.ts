import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FindingSubCategory } from './finding-sub-category';
import { createRequestOption } from '../../shared/pagination.constants';

@Injectable({
  providedIn: 'root',
})
export class FindingSubCategoryService {
  private resourceUrl = 'api/finding-sub-categories';

  constructor(private http: HttpClient) {}

  query(req?: any): Observable<HttpResponse<FindingSubCategory[]>> {
    const options = createRequestOption(req);
    return this.http.get<FindingSubCategory[]>(this.resourceUrl, {
      params: options,
      observe: 'response',
    });
  }

  getById(id: number): Observable<FindingSubCategory> {
    return this.http.get<FindingSubCategory>(`${this.resourceUrl}/${id}`);
  }

  create(
    findingSubCategory: FindingSubCategory
  ): Observable<FindingSubCategory> {
    return this.http.post<FindingSubCategory>(
      this.resourceUrl,
      findingSubCategory
    );
  }

  update(
    findingSubCategory: FindingSubCategory
  ): Observable<FindingSubCategory> {
    return this.http.put<FindingSubCategory>(
      `${this.resourceUrl}`,
      findingSubCategory
    );
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
