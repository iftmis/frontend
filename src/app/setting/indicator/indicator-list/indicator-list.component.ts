import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { HttpHeaders } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { ToastService } from '../../../shared/toast.service';
import { IndicatorService } from '../indicator.service';
import { Title } from '@angular/platform-browser';
import { IndicatorDeleteComponent } from '../indicator-delete/indicator-delete.component';
import { Indicator } from '../indicator';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-indicator-list',
  templateUrl: './indicator-list.component.html',
  styleUrls: ['./indicator-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicatorListComponent implements OnInit {
  displayedColumns = ['id', 'indicator', 'subArea', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  auditableAreaSubject: BehaviorSubject<Indicator[]> = new BehaviorSubject([]);

  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;
  page!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private titleService: Title,
    private toastService: ToastService,
    private auditableAreaService: IndicatorService
  ) {
    this.titleService.setTitle('Indicators|' + environment.app);
  }

  loadPage() {
    const pageToLoad = this.page || 0;
    this.auditableAreaService
      .getAllPaged({
        page: pageToLoad,
        size: this.itemsPerPage,
      })
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers, this.page),
        () => this.onError()
      );
  }

  getData(): Observable<Indicator[]> {
    return this.auditableAreaSubject.asObservable();
  }

  ngOnInit() {
    this.loadPage();
  }

  delete(id: number, auditableArea: Indicator) {
    const dialogRef = this.dialog.open(IndicatorDeleteComponent, {
      data: auditableArea,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.auditableAreaService.delete(id).subscribe({
          next: () => {
            this.loadPage();
            this.toastService.success(
              'Success',
              'Indicator Area Deleted Successfully!'
            );
            this.router.navigate(['/settings/indicators']);
          },
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }

  onSuccess(data: any, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.auditableAreaSubject.next(data);
  }

  onError(): void {}

  pageChange($event: PageEvent) {
    this.itemsPerPage = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage();
  }
}
