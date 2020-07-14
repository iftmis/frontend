import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Objective } from './objective';
import { ObjectiveService } from './objective.service';

@Injectable({
  providedIn: 'root',
})
export class ObjectiveListResolver implements Resolve<Objective[]> {
  constructor(private service: ObjectiveService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Objective[]> {
    return this.service.query();
  }
}
