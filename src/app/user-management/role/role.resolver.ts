import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Role } from './role';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root',
})
export class RoleResolver implements Resolve<Role | undefined> {
  constructor(private service: RoleService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Role | undefined> {
    const idParam = 'id';
    const id = route.params[idParam];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
