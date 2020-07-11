import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { createRequestOption } from '../../shared/pagination.constants';
import { PasswordReset, User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private resourceUrl = 'api/users';

  constructor(private http: HttpClient) {}

  getAllUnPaged(): Observable<User[]> {
    return this.http.get<any>(this.resourceUrl);
  }

  getAllPaged(req?: any): Observable<HttpResponse<User[]>> {
    const options = createRequestOption(req);
    return this.http.get<User[]>(this.resourceUrl + '/page', {
      params: options,
      observe: 'response',
    });
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.resourceUrl}/${id}`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.resourceUrl, user);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.resourceUrl}`, user);
  }

  authorities(): Observable<string[]> {
    return this.http.get<string[]>(this.resourceUrl + '/authorities');
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }

  resetPassword(passwordReset: PasswordReset): Observable<User> {
    return this.http.post<User>(
      this.resourceUrl + '/resetPassword',
      passwordReset
    );
  }
}
