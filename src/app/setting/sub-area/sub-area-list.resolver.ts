import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { SubArea } from './sub-area';
import { SubAreaService } from './sub-area.service';

@Injectable({
  providedIn: 'root',
})
export class SubAreaListResolver implements Resolve<SubArea[]> {
  constructor(private service: SubAreaService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<SubArea[]> {
    return this.service.query();
  }
}
