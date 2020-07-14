import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { RiskCategoryService } from '../risk-category.service';
import { RiskCategoryDeleteComponent } from '../risk-category-delete/risk-category-delete.component';
import { RiskCategory } from '../risk-category';
import { ToastService } from '../../../shared/toast.service';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { GfsCode } from '../../gfs-code/gfs-code';
import { HttpHeaders } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-risk-category-list',
  templateUrl: './risk-category-list.component.html',
  styleUrls: ['./risk-category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskCategoryListComponent implements OnInit {
  displayedColumns = ['code', 'name', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;
  page!: number;

  private RiskCategorySubject: BehaviorSubject<
    RiskCategory[]
  > = new BehaviorSubject([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private riskCategoryService: RiskCategoryService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadPage();
  }
  loadPage() {
    const pageToLoad = this.page || 0;
    this.riskCategoryService
      .query({
        page: pageToLoad,
        size: this.itemsPerPage,
      })
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers, this.page),
        () => this.onError()
      );
  }
  getData(): Observable<RiskCategory[]> {
    return this.RiskCategorySubject.asObservable();
  }
  onSuccess(data: any, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.RiskCategorySubject.next(data);
  }
  onError(): void {}

  pageChange($event: PageEvent) {
    this.itemsPerPage = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage();
  }

  delete(id: number, riskCategory: RiskCategory) {
    const dialogRef = this.dialog.open(RiskCategoryDeleteComponent, {
      data: riskCategory,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.riskCategoryService.delete(id).subscribe({
          next: () => {
            this.loadPage();
            this.toastService.success(
              'Success',
              'Risk Category Deleted Successfully!'
            );
            this.router.navigate(['/settings/risk-categories']);
          },
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
