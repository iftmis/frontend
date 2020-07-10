import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Quarter } from './quarter';
import { QuarterService } from './quarter.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuarterListResolver implements Resolve<HttpResponse<Quarter[]>> {
  constructor(private service: QuarterService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<HttpResponse<Quarter[]>> {
    return this.service.query();
  }
}
