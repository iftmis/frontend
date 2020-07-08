import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpHeaders } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';
import { FindingSubCategoryDeleteComponent } from '../finding-sub-category-delete/finding-sub-category-delete.component';
import { FindingSubCategory } from '../finding-sub-category';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../shared/pagination.constants';
import { Title } from '@angular/platform-browser';
import { FindingSubCategoryService } from '../finding-sub-category.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-finding-sub-category-list',
  templateUrl: './finding-sub-category-list.component.html',
  styleUrls: ['./finding-sub-category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindingSubCategoryListComponent implements OnInit {
  displayedColumns = ['code', 'name', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

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
    private findingSubCategoryService: FindingSubCategoryService
  ) {
    this.titleService.setTitle('Finding Sub-Categories|' + environment.app);
  }

  ngOnInit() {
    this.loadPage();
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
        this.showLoader = true;
        this.findingSubCategoryService.delete(id).subscribe({
          next: () => this.router.navigate(['/finding-sub-categories']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
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
