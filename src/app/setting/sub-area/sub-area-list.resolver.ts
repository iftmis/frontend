import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SubAreaService } from './sub-area.service';
import { HttpResponse } from '@angular/common/http';
import { SubArea } from './sub-area';

@Injectable({
  providedIn: 'root',
})
export class SubAreaListResolver implements Resolve<HttpResponse<SubArea[]>> {
  constructor(private service: SubAreaService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<HttpResponse<SubArea[]>> {
    return this.service.getAllPaged();
  }
}
