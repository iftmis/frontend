import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { createRequestOption } from '../../shared/pagination.constants';
import { Role } from './role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private resourceUrl = 'api/authorities';

  constructor(private http: HttpClient) {}

  getAllUnPaged(): Observable<Role[]> {
    return this.http.get<any>(this.resourceUrl);
  }

  getAllPaged(req?: any): Observable<HttpResponse<Role[]>> {
    const options = createRequestOption(req);
    return this.http.get<Role[]>(this.resourceUrl + '/page', {
      params: options,
      observe: 'response',
    });
  }

  getByName(name: string): Observable<Role> {
    return this.http.get<Role>(`${this.resourceUrl}/${name}`);
  }

  create(role: Role): Observable<Role> {
    return this.http.post<Role>(this.resourceUrl, role);
  }

  update(role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.resourceUrl}`, role);
  }

  delete(name: string) {
    return this.http.delete<any>(`${this.resourceUrl}/${name}`);
  }
}
