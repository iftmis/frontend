import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { InspectionActivities } from './inspection-activities';
import { InspectionActivitiesService } from './inspection-activities.service';

@Injectable({
  providedIn: 'root',
})
export class InspectionActivitiesResolver
  implements Resolve<InspectionActivities | undefined> {
  constructor(private service: InspectionActivitiesService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<InspectionActivities | undefined> {
    const idParam = 'id';
    const id = route.params[idParam];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
