import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { OrganisationUnitLevel } from './organisation-unit-level';
import { OrganisationUnitLevelService } from './organisation-unit-level.service';

@Injectable({
  providedIn: 'root',
})
export class OrganisationUnitLevelListResolver
  implements Resolve<OrganisationUnitLevel[]> {
  constructor(private service: OrganisationUnitLevelService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<OrganisationUnitLevel[]> {
    return this.service.query();
  }
}
