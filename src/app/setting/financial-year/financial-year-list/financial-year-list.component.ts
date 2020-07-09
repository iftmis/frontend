import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import {
  ITEMS_PER_PAGE,
  PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { HttpHeaders } from '@angular/common/http';
import { FinancialYear } from '../financial-year';
import { FinancialYearService } from '../financial-year.service';
import { FinancialYearDeleteComponent } from '../financial-year-delete/financial-year-delete.component';
import { ToastService } from '../../../shared/toast.service';

@Component({
  selector: 'app-financial-year-list',
  templateUrl: './financial-year-list.component.html',
  styleUrls: ['./financial-year-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinancialYearListComponent implements OnInit {
  displayedColumns = [
    'name',
    'startDate',
    'endDate',
    'isOpened',
    'formActions',
  ];
  routeData$ = this.route.data;
  showLoader = false;

  financialYearSubject: BehaviorSubject<FinancialYear[]> = new BehaviorSubject(
    []
  );

  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;
  page!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private titleService: Title,
    private financialYearService: FinancialYearService,
    private toastService: ToastService
  ) {
    this.titleService.setTitle('Financial Years|' + environment.app);
  }

  loadPage() {
    const pageToLoad = this.page || 0;
    this.financialYearService
      .getAll({
        page: pageToLoad,
        size: this.itemsPerPage,
      })
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers, this.page),
        () => this.onError()
      );
  }

  getData(): Observable<FinancialYear[]> {
    return this.financialYearSubject.asObservable();
  }

  ngOnInit() {
    this.loadPage();
  }

  delete(id: number, financialYear: FinancialYear) {
    const dialogRef = this.dialog.open(FinancialYearDeleteComponent, {
      data: financialYear,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.financialYearService.delete(id).subscribe({
          next: () => {
            this.loadPage();
            this.toastService.success(
              'Success',
              'Financial Year Deleted Successfully!'
            );
            this.router.navigate(['/settings/financial-years']);
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
    this.financialYearSubject.next(data);
  }

  onError(): void {}

  pageChange($event: PageEvent) {
    this.itemsPerPage = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage();
  }
}
