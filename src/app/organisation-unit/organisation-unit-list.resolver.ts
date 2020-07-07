import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { OrganisationUnit } from './organisation-unit';
import { OrganisationUnitService } from './organisation-unit.service';

@Injectable({
  providedIn: 'root',
})
export class OrganisationUnitListResolver
  implements Resolve<OrganisationUnit[]> {
  constructor(private service: OrganisationUnitService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<OrganisationUnit[]> {
    return this.service.query();
  }
}
