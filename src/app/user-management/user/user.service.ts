import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { createRequestOption } from '../../shared/pagination.constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private resourceUrl = 'api/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<any>(this.resourceUrl);
  }

  getAllPaged(req?: any): Observable<HttpResponse<User[]>> {
    const options = createRequestOption(req);
    return this.http.get<User[]>(this.resourceUrl, {
      params: options,
      observe: 'response',
    });
  }

  getById(id: number): Observable<User> {
    return this.http
      .get<User>(`${this.resourceUrl}/${id}`)
      .pipe(map((user: User) => this.parseResponse(user)));
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.resourceUrl, user);
  }

  update(row: User): Observable<User> {
    return this.http.put<User>(`${this.resourceUrl}`, row);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }

  private parseArrayResponse(response: User[]): User[] {
    response.forEach((user: User) => {
      this.parseResponse(user);
    });
    return response;
  }

  private parseResponse(user: User): User {
    return user;
  }
}
