import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { OrganisationUnit } from './organisation-unit';
import { OrganisationUnitService } from './organisation-unit.service';

@Injectable({
  providedIn: 'root',
})
export class OrganisationUnitResolver
  implements Resolve<OrganisationUnit | undefined> {
  constructor(private service: OrganisationUnitService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<OrganisationUnit | undefined> {
    const idParam = 'id';
    const id = route.params['organisationUnitId'] || route.params[idParam];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}

@Injectable({
  providedIn: 'root',
})
export class ParentOrganisationUnitResolver
  implements Resolve<OrganisationUnit | undefined> {
  constructor(private service: OrganisationUnitService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<OrganisationUnit | undefined> {
    const id = route.params['parentId'];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
