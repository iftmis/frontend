import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { QuarterService } from '../quarter.service';
import { QuarterDeleteComponent } from '../quarter-delete/quarter-delete.component';
import { Quarter } from '../quarter';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpHeaders } from '@angular/common/http';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';

@Component({
  selector: 'app-quarter-list',
  templateUrl: './quarter-list.component.html',
  styleUrls: ['./quarter-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuarterListComponent implements OnInit {
  displayedColumns = [
    'code',
    'name',
    'startDate',
    'endDate',
    'financialYearName',
    'formActions',
  ];
  routeData$ = this.route.data;
  showLoader = false;

  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;
  page!: number;

  private QuarterBehaviorSubject: BehaviorSubject<
    Quarter[]
  > = new BehaviorSubject([]);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private quarterService: QuarterService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Quarters|' + environment.app);
  }

  ngOnInit() {
    this.loadPage();
  }

  loadPage() {
    const pageToLoad = this.page || 0;
    this.quarterService
      .query({
        page: pageToLoad,
        size: this.itemsPerPage,
      })
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers, this.page),
        () => this.onError()
      );
  }

  getData(): Observable<Quarter[]> {
    return this.QuarterBehaviorSubject.asObservable();
  }

  onSuccess(data: any, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.QuarterBehaviorSubject.next(data);
  }

  onError(): void {}

  pageChange($event: PageEvent) {
    this.itemsPerPage = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage();
  }

  delete(id: number, quarter: Quarter) {
    const dialogRef = this.dialog.open(QuarterDeleteComponent, {
      data: quarter,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.quarterService.delete(id).subscribe({
          next: () => this.router.navigate(['/quarters']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
