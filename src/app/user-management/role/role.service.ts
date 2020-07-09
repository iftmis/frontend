import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from './role';
import { createRequestOption } from '../../shared/pagination.constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private resourceUrl = 'api/roles';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Role[]> {
    return this.http.get<any>(this.resourceUrl);
  }

  getAllPaged(req?: any): Observable<HttpResponse<Role[]>> {
    const options = createRequestOption(req);
    return this.http.get<Role[]>(this.resourceUrl, {
      params: options,
      observe: 'response',
    });
  }

  getById(id: number): Observable<Role> {
    return this.http
      .get<Role>(`${this.resourceUrl}/${id}`)
      .pipe(map((role: Role) => this.parseResponse(role)));
  }

  create(role: Role): Observable<Role> {
    return this.http.post<Role>(this.resourceUrl, role);
  }

  update(row: Role): Observable<Role> {
    return this.http.put<Role>(`${this.resourceUrl}`, row);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }

  private parseArrayResponse(response: Role[]): Role[] {
    response.forEach((role: Role) => {
      this.parseResponse(role);
    });
    return response;
  }

  private parseResponse(role: Role): Role {
    return role;
  }
}
