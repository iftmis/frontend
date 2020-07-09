import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { FindingCategory } from './finding-category';
import { FindingCategoryService } from './finding-category.service';

@Injectable({
  providedIn: 'root',
})
export class FindingCategoryResolver
  implements Resolve<FindingCategory | undefined> {
  constructor(private service: FindingCategoryService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<FindingCategory | undefined> {
    const idParam = 'id';
    const id = route.params[idParam];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
