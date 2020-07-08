import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { environment } from '../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  ITEMS_PER_PAGE,
  PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../shared/pagination.constants';
import { FindingCategoryDeleteComponent } from '../finding-category-delete/finding-category-delete.component';
import { FindingCategoryService } from '../finding-category.service';
import { FindingCategory } from '../finding-category';

@Component({
  selector: 'app-finding-category-list',
  templateUrl: './finding-category-list.component.html',
  styleUrls: ['./finding-category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindingCategoryListComponent implements OnInit {
  displayedColumns = ['code', 'name', 'formActions'];
  page: number;
  size: number;
  perPageOptions: number[];
  totalItems: number;
  showLoader = false;
  private findingCategorySubject: BehaviorSubject<
    FindingCategory[]
  > = new BehaviorSubject([]);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private findingCategoryService: FindingCategoryService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Finding Categories|' + environment.app);
    this.page = PAGE;
    this.size = ITEMS_PER_PAGE;
    this.perPageOptions = PAGE_SIZE_OPTIONS;
  }

  ngOnInit() {
    this.loadData(this.page, this.size);
  }

  loadData(page: number, size: number) {
    this.findingCategoryService.getAll(page, size).subscribe(
      response => {
        this.findingCategorySubject.next(response.content);
        this.totalItems = response.totalElements;
      },
      error => {
        console.log(error);
      }
    );
  }

  getData(): Observable<FindingCategory[]> {
    return this.findingCategorySubject.asObservable();
  }

  pageChanged(page: any) {
    this.page = page.pageIndex;
    this.size = page.pageSize;
    this.loadData(this.page, this.size);
  }

  delete(id: number, findingCategory: FindingCategory) {
    const dialogRef = this.dialog.open(FindingCategoryDeleteComponent, {
      data: findingCategory,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.findingCategoryService.delete(id).subscribe({
          next: () => this.router.navigate(['/category-of-findings']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
