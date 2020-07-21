import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { InspectionActivities } from './inspection-activities';
import { InspectionActivitiesService } from './inspection-activities.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InspectionActivitiesListResolver
  implements Resolve<HttpResponse<InspectionActivities[]>> {
  constructor(private service: InspectionActivitiesService) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<HttpResponse<InspectionActivities[]>> {
    return this.service.query();
  }
}
