import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { createRequestOption } from '../../shared/pagination.constants';
import { PasswordReset, User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private resourceUrl = 'api';

  constructor(private http: HttpClient) {}

  account(): Observable<User> {
    return this.http.get<User>(`${this.resourceUrl}/account`);
  }
}
