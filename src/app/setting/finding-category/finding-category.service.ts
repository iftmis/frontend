import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FindingCategory } from './finding-category';

@Injectable({
  providedIn: 'root',
})
export class FindingCategoryService {
  private resourceUrl = 'api/finding-categories';

  constructor(private http: HttpClient) {}

  query(): Observable<FindingCategory[]> {
    return this.http.get<FindingCategory[]>(this.resourceUrl);
  }

  getAll(page: number, size: number): Observable<any> {
    return this.http.get<any>(this.resourceUrl, {
      params: {
        page: `${page}`,
        size: `${size}`,
      },
    });
  }

  getById(id: number): Observable<FindingCategory> {
    return this.http.get<FindingCategory>(`${this.resourceUrl}/${id}`);
  }

  all(): Observable<FindingCategory[]> {
    return this.http.get<FindingCategory[]>(`${this.resourceUrl}`);
  }

  create(findingCategory: FindingCategory): Observable<FindingCategory> {
    return this.http.post<FindingCategory>(this.resourceUrl, findingCategory);
  }

  update(findingCategory: FindingCategory): Observable<FindingCategory> {
    return this.http.put<FindingCategory>(
      `${this.resourceUrl}`,
      findingCategory
    );
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
