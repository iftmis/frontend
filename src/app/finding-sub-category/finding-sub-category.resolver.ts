import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { FindingSubCategory } from './finding-sub-category';
import { FindingSubCategoryService } from './finding-sub-category.service';

@Injectable({
  providedIn: 'root',
})
export class FindingSubCategoryResolver
  implements Resolve<FindingSubCategory | undefined> {
  constructor(private service: FindingSubCategoryService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<FindingSubCategory | undefined> {
    const idParam = 'id';
    const id = route.params[idParam];
    if (id) {
      return this.service.getById(id);
    }
    return of(undefined);
  }
}
