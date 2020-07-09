import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FindingSubCategory } from './finding-sub-category';
import { HttpResponse } from '@angular/common/http';
import { FindingSubCategoryService } from './finding-sub-category.service';

@Injectable({
  providedIn: 'root',
})
export class FindingSubCategoryListResolver
  implements Resolve<HttpResponse<FindingSubCategory[]>> {
  constructor(private service: FindingSubCategoryService) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<HttpResponse<FindingSubCategory[]>> {
    return this.service.query();
  }
}
