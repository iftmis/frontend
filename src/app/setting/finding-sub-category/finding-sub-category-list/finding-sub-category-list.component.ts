import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpHeaders } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';
import { FindingSubCategoryDeleteComponent } from '../finding-sub-category-delete/finding-sub-category-delete.component';
import { FindingSubCategory } from '../finding-sub-category';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { Title } from '@angular/platform-browser';
import { FindingSubCategoryService } from '../finding-sub-category.service';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../shared/toast.service';
import { FindingSubCategoryDetailComponent } from '../finding-sub-category-detail/finding-sub-category-detail.component';

@Component({
  selector: 'app-finding-sub-category-list',
  templateUrl: './finding-sub-category-list.component.html',
  styleUrls: ['./finding-sub-category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindingSubCategoryListComponent implements OnInit {
  displayedColumns = ['code', 'findingCategoryName', 'name', 'formActions'];
  routeData$ = this.route.data;
  public showProgress: boolean;

  findingSubCategorySubject: BehaviorSubject<
    FindingSubCategory[]
  > = new BehaviorSubject([]);

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
    private findingSubCategoryService: FindingSubCategoryService
  ) {
    this.titleService.setTitle('Finding Sub-Categories | ' + environment.app);
  }

  ngOnInit() {
    this.loadPage();
  }

  create() {
    const data = {
      title: 'Create a new Finding Sub Category',
      action: 'create',
      label: 'Save Sub Category',
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

    const dialog = this.dialog.open(FindingSubCategoryDetailComponent, config);
    dialog.afterClosed().subscribe(response => {
      if (response.success) {
        this.loadPage();
      }
    });
  }

  loadPage() {
    const pageToLoad = this.page || 0;
    this.findingSubCategoryService
      .query({
        page: pageToLoad,
        size: this.itemsPerPage,
      })
      .subscribe(
        resp => {
          const items = resp.body as FindingSubCategory[];
          this.onSuccess(items, resp.headers, this.page);
        },
        () => this.onError()
      );
  }

  getData(): Observable<FindingSubCategory[]> {
    return this.findingSubCategorySubject.asObservable();
  }

  delete(id: number, findingSubCategory: FindingSubCategory) {
    const dialogRef = this.dialog.open(FindingSubCategoryDeleteComponent, {
      data: findingSubCategory,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showProgress = true;
        this.findingSubCategoryService.delete(id).subscribe({
          next: () => {
            this.loadPage();
            this.toastService.success(
              'Success',
              'Finding Sub-Category Deleted Successfully!'
            );
            this.router.navigate(['/main/settings/finding-sub-categories']);
          },
          error: () => (this.showProgress = false),
          complete: () => (this.showProgress = false),
        });
      }
    });
  }

  onSuccess(
    data: FindingSubCategory[],
    headers: HttpHeaders,
    page: number
  ): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.findingSubCategorySubject.next(data);
  }

  onError(): void {}

  pageChange($event: PageEvent) {
    this.itemsPerPage = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage();
  }
}
