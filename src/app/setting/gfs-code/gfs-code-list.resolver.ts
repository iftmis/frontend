import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { GfsCode } from './gfs-code';
import { GfsCodeService } from './gfs-code.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GfsCodeListResolver implements Resolve<HttpResponse<GfsCode[]>> {
  constructor(private service: GfsCodeService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<HttpResponse<GfsCode[]>> {
    return this.service.query();
  }
}
