import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Inspection } from './inspection';
import { InspectionService } from './inspection.service';

@Injectable({
  providedIn: 'root',
})
export class InspectionListResolver implements Resolve<Inspection[]> {
  constructor(private service: InspectionService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Inspection[]> {
    return this.service.query();
  }
}
