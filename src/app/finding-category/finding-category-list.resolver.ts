import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { FindingCategory } from './finding-category';
import { FindingCategoryService } from './finding-category.service';

@Injectable({
  providedIn: 'root',
})
export class FindingCategoryListResolver implements Resolve<FindingCategory[]> {
  constructor(private service: FindingCategoryService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<FindingCategory[]> {
    return this.service.query();
  }
}
