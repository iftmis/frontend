import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { InspectionPlan } from './inspection-plan';
import { InspectionPlanService } from './inspection-plan.service';

@Injectable({
  providedIn: 'root',
})
export class InspectionPlanResolver
  implements Resolve<InspectionPlan | undefined> {
  constructor(private service: InspectionPlanService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<InspectionPlan | undefined> {
    const idParam = 'id';
    const id = route.params[idParam];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
