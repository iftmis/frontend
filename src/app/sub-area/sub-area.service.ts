import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SubArea } from './sub-area';

@Injectable({
  providedIn: 'root',
})
export class SubAreaService {
  private resourceUrl = 'api/sub-areas';

  constructor(private http: HttpClient) {}

  query(): Observable<SubArea[]> {
    return this.http.get<SubArea[]>(this.resourceUrl);
  }

  getById(id: number): Observable<SubArea> {
    return this.http.get<SubArea>(`${this.resourceUrl}/${id}`);
  }

  create(subArea: SubArea): Observable<SubArea> {
    return this.http.post<SubArea>(this.resourceUrl, subArea);
  }

  update(subArea: SubArea): Observable<SubArea> {
    return this.http.put<SubArea>(`${this.resourceUrl}`, subArea);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
