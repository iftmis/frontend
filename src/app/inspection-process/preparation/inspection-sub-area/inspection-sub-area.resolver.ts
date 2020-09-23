import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { InspectionSubArea } from './inspection-sub-area';
import { InspectionSubAreaService } from './inspection-sub-area.service';

@Injectable({
  providedIn: 'root',
})
export class InspectionSubAreaResolver
  implements Resolve<InspectionSubArea | undefined> {
  constructor(private service: InspectionSubAreaService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<InspectionSubArea | undefined> {
    const idParam = 'id';
    const id = route.params[idParam];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
