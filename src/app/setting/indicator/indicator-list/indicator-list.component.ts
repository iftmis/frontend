import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { IndicatorService } from '../indicator.service';
import { IndicatorDeleteComponent } from '../indicator-delete/indicator-delete.component';
import { Indicator } from '../indicator';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrganisationUnitLevel } from '../../organisation-unit-level/organisation-unit-level';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-indicator-list',
  templateUrl: './indicator-list.component.html',
  styleUrls: ['./indicator-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicatorListComponent implements OnInit {
  displayedColumns = ['subAreaName', 'name', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;
  page!: number;

  private IndicatorSubject: BehaviorSubject<Indicator[]> = new BehaviorSubject(
    []
  );
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private indicatorService: IndicatorService
  ) {}

  ngOnInit() {
    this.loadPage();
  }

  loadPage() {
    const pageToLoad = this.page || 0;
    this.indicatorService
      .query({
        page: pageToLoad,
        size: this.itemsPerPage,
      })
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers, this.page),
        () => this.onError()
      );
  }

  getData(): Observable<Indicator[]> {
    return this.IndicatorSubject.asObservable();
  }

  onSuccess(data: any, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.IndicatorSubject.next(data);
  }

  onError(): void {}

  pageChange($event: PageEvent) {
    this.itemsPerPage = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage();
  }

  delete(id: number, indicator: Indicator) {
    const dialogRef = this.dialog.open(IndicatorDeleteComponent, {
      data: indicator,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.indicatorService.delete(id).subscribe({
          next: () => this.router.navigate(['/settings/indicators']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
