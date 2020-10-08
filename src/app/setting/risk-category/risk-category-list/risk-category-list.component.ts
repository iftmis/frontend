import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { Title } from '@angular/platform-browser';
import { ToastService } from '../../../shared/toast.service';
import { environment } from '../../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { RiskCategoryService } from '../risk-category.service';
import { RiskCategory } from '../risk-category';
import { RiskCategoryDeleteComponent } from '../risk-category-delete/risk-category-delete.component';
import { RiskCategoryDetailComponent } from '../risk-category-detail/risk-category-detail.component';

@Component({
  selector: 'app-risk-category-list',
  templateUrl: './risk-category-list.component.html',
  styleUrls: ['./risk-category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskCategoryListComponent implements OnInit {
  displayedColumns = ['id', 'code', 'name', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  riskCategorySubject: BehaviorSubject<RiskCategory[]> = new BehaviorSubject(
    []
  );

  totalItems = 0;
  size: number;
  pageSizeOptions: number[];
  page: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private titleService: Title,
    private toastService: ToastService,
    private riskCategoryService: RiskCategoryService
  ) {
    this.page = 0;
    this.size = ITEMS_PER_PAGE;
    this.pageSizeOptions = PAGE_SIZE_OPTIONS;
    this.titleService.setTitle('Risk Categories|' + environment.app);
  }

  ngOnInit() {
    this.loadPage(this.page, this.size);
  }

  loadPage(page: number, size: number) {
    this.riskCategoryService.getAllPaged(page, size).subscribe(
      resp => this.onSuccess(resp.body, resp.headers),
      () => this.onError()
    );
  }

  getData(): Observable<RiskCategory[]> {
    return this.riskCategorySubject.asObservable();
  }

  create() {
    const data = {
      title: 'Creates a Risk Category',
      action: 'create',
      label: 'Save Risk Category',
    };

    const config = new MatDialogConfig();
    config.data = data;
    config.width = '60%';
    config.position = {
      top: '80px',
    };
    config.panelClass = 'mat-dialog-box';
    config.backdropClass = 'mat-dialog-overlay';
    config.disableClose = true;
    config.autoFocus = false;

    const dialogRef = this.dialog.open(RiskCategoryDetailComponent, config);
    dialogRef.afterClosed().subscribe(response => {
      console.log(response);
      if (response.success) {
        this.loadPage(this.page, this.size);
      }
    });
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
            this.loadPage(this.page, this.size);
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

  onSuccess(data: any, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.riskCategorySubject.next(data);
  }

  onError(): void {}

  pageChange($event: PageEvent) {
    this.size = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage(this.page, this.size);
  }
}
