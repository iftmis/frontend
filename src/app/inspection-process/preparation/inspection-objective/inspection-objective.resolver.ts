import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { InspectionObjective } from './inspection-objective';
import { InspectionObjectiveService } from './inspection-objective.service';

@Injectable({
  providedIn: 'root',
})
export class InspectionObjectiveResolver
  implements Resolve<InspectionObjective | undefined> {
  constructor(private service: InspectionObjectiveService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<InspectionObjective | undefined> {
    const idParam = 'id';
    const id = route.params[idParam];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
