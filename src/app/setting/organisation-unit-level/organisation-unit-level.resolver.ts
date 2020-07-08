import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { OrganisationUnitLevel } from './organisation-unit-level';
import { OrganisationUnitLevelService } from './organisation-unit-level.service';

@Injectable({
  providedIn: 'root',
})
export class OrganisationUnitLevelResolver
  implements Resolve<OrganisationUnitLevel | undefined> {
  constructor(private service: OrganisationUnitLevelService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<OrganisationUnitLevel | undefined> {
    const idParam = 'id';
    const id = route.params[idParam];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
