import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { InspectionActivities } from './inspection-activities';
import { InspectionActivitiesService } from './inspection-activities.service';

@Injectable({
  providedIn: 'root',
})
export class InspectionActivitiesListResolver
  implements Resolve<InspectionActivities[]> {
  constructor(private service: InspectionActivitiesService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<InspectionActivities[]> {
    return this.service.query();
  }
}
