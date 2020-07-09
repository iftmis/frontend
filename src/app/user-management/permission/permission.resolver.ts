import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Permission } from './permission';
import { PermissionService } from './permission.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionResolver implements Resolve<Permission | undefined> {
  constructor(private service: PermissionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Permission | undefined> {
    const idParam = 'id';
    const id = route.params[idParam];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
