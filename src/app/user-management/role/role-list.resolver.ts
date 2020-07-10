import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from './role';
import { RoleService } from './role.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RoleListResolver implements Resolve<HttpResponse<Role[]>> {
  constructor(private service: RoleService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<HttpResponse<Role[]>> {
    return this.service.getAllPaged();
  }
}
