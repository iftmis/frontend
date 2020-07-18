import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { InspectionPlan } from './inspection-plan';
import { InspectionPlanService } from './inspection-plan.service';

@Injectable({
  providedIn: 'root',
})
export class InspectionPlanListResolver implements Resolve<InspectionPlan[]> {
  constructor(private service: InspectionPlanService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<InspectionPlan[]> {
    return this.service.query();
  }
}
