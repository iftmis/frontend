import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { SubArea } from './sub-area';
import { SubAreaService } from './sub-area.service';

@Injectable({
  providedIn: 'root',
})
export class SubAreaResolver implements Resolve<SubArea | undefined> {
  constructor(private service: SubAreaService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<SubArea | undefined> {
    const idParam = 'id';
    const id = route.params[idParam];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
