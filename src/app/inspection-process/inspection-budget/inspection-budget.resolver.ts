import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { InspectionBudget } from './inspection-budget';
import { InspectionBudgetService } from './inspection-budget.service';

@Injectable({
  providedIn: 'root',
})
export class InspectionBudgetResolver
  implements Resolve<InspectionBudget | undefined> {
  constructor(private service: InspectionBudgetService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<InspectionBudget | undefined> {
    const idParam = 'id';
    const id = route.params[idParam];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
