import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Objective } from './objective';

@Injectable({
  providedIn: 'root',
})
export class ObjectiveService {
  private resourceUrl = 'api/objectives';

  constructor(private http: HttpClient) {}

  query(): Observable<Objective[]> {
    return this.http.get<Objective[]>(this.resourceUrl);
  }

  getById(id: number): Observable<Objective> {
    return this.http.get<Objective>(`${this.resourceUrl}/${id}`);
  }

  create(objective: Objective): Observable<Objective> {
    return this.http.post<Objective>(this.resourceUrl, objective);
  }

  update(objective: Objective): Observable<Objective> {
    return this.http.put<Objective>(`${this.resourceUrl}`, objective);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }
}
