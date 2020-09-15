import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { InspectionPlan } from './inspection-plan';
import { InspectionPlanService } from './inspection-plan.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InspectionPlanListResolver
  implements Resolve<HttpResponse<InspectionPlan[]>> {
  constructor(private service: InspectionPlanService) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<HttpResponse<InspectionPlan[]>> {
    return this.service.query();
  }
}
