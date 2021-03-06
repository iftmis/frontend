import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { OrganisationUnitLevel } from './organisation-unit-level';
import { OrganisationUnitLevelService } from './organisation-unit-level.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrganisationUnitLevelListResolver
  implements Resolve<HttpResponse<OrganisationUnitLevel[]>> {
  constructor(private service: OrganisationUnitLevelService) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<HttpResponse<OrganisationUnitLevel[]>> {
    return this.service.query();
  }
}
