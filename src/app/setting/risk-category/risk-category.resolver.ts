import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { RiskCategory } from './risk-category';
import { RiskCategoryService } from './risk-category.service';

@Injectable({
  providedIn: 'root',
})
export class RiskCategoryResolver implements Resolve<RiskCategory | undefined> {
  constructor(private service: RiskCategoryService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<RiskCategory | undefined> {
    const idParam = 'id';
    const id = route.params[idParam];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
