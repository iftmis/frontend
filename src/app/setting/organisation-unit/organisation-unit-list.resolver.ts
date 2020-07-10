import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { OrganisationUnit } from './organisation-unit';
import { OrganisationUnitService } from './organisation-unit.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrganisationUnitListResolver
  implements Resolve<HttpResponse<OrganisationUnit[]>> {
  constructor(private service: OrganisationUnitService) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<HttpResponse<OrganisationUnit[]>> {
    return this.service.query();
  }
}
