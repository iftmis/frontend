import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { InspectionPlanService } from '../inspection-plan.service';
import { InspectionPlanDeleteComponent } from '../inspection-plan-delete/inspection-plan-delete.component';
import { InspectionPlan } from '../inspection-plan';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { PageEvent } from '@angular/material/paginator';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-inspection-plan-list',
  templateUrl: './inspection-plan-list.component.html',
  styleUrls: ['./inspection-plan-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionPlanListComponent implements OnInit {
  displayedColumns = [
    'name',
    'FinancialYearName',
    'OrganisationUnitName',
    'formActions',
  ];
  routeData$ = this.route.data;
  showLoader = false;

  inspectionPlanSubject: BehaviorSubject<
    InspectionPlan[]
  > = new BehaviorSubject([]);

  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;
  page!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private inspectionPlanService: InspectionPlanService
  ) {}

  ngOnInit() {}

  loadPage() {
    const pageToLoad = this.page || 0;
    this.inspectionPlanService
      .getAllPaged({
        page: pageToLoad,
        size: this.itemsPerPage,
      })
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers, this.page),
        () => this.onError()
      );
  }

  delete(id: number, inspectionPlan: InspectionPlan) {
    const dialogRef = this.dialog.open(InspectionPlanDeleteComponent, {
      data: inspectionPlan,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.inspectionPlanService.delete(id).subscribe({
          next: () =>
            this.router.navigate(['inspection-planning/inspection-planning']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
  onSuccess(data: any, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.inspectionPlanSubject.next(data);
  }

  onError(): void {}
  pageChange($event: PageEvent) {
    this.itemsPerPage = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage();
  }
}
