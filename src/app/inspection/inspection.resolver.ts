import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Inspection } from './inspection';
import { InspectionService } from './inspection.service';

@Injectable({
  providedIn: 'root',
})
export class InspectionResolver implements Resolve<Inspection | undefined> {
  constructor(private service: InspectionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Inspection | undefined> {
    const idParam = 'id';
    const id = route.params[idParam];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
