import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './user';
import { HttpResponse } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UserListResolver implements Resolve<HttpResponse<User[]>> {
  constructor(private service: UserService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<HttpResponse<User[]>> {
    return this.service.getAllPaged();
  }
}
