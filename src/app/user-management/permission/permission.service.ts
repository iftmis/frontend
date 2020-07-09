import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permission } from './permission';
import { createRequestOption } from '../../shared/pagination.constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private resourceUrl = 'api/permissions';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Permission[]> {
    return this.http.get<any>(this.resourceUrl);
  }

  getAllPaged(req?: any): Observable<HttpResponse<Permission[]>> {
    const options = createRequestOption(req);
    return this.http.get<Permission[]>(this.resourceUrl, {
      params: options,
      observe: 'response',
    });
  }

  getById(id: number): Observable<Permission> {
    return this.http
      .get<Permission>(`${this.resourceUrl}/${id}`)
      .pipe(map((permission: Permission) => this.parseResponse(permission)));
  }

  create(permission: Permission): Observable<Permission> {
    return this.http.post<Permission>(this.resourceUrl, permission);
  }

  update(row: Permission): Observable<Permission> {
    return this.http.put<Permission>(`${this.resourceUrl}`, row);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }

  private parseArrayResponse(response: Permission[]): Permission[] {
    response.forEach((permission: Permission) => {
      this.parseResponse(permission);
    });
    return response;
  }

  private parseResponse(permission: Permission): Permission {
    return permission;
  }
}
