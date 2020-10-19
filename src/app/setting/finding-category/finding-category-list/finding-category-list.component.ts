import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  ITEMS_PER_PAGE,
  PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { FindingCategoryDeleteComponent } from '../finding-category-delete/finding-category-delete.component';
import { FindingCategoryService } from '../finding-category.service';
import { FindingCategory } from '../finding-category';
import { ToastService } from '../../../shared/toast.service';
import { FindingCategoryDetailComponent } from '../finding-category-detail/finding-category-detail.component';

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
  public showProgress: boolean;
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
    private toastService: ToastService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Finding Categories|' + environment.app);
    this.page = PAGE;
    this.size = ITEMS_PER_PAGE;
    this.perPageOptions = PAGE_SIZE_OPTIONS;
    this.showProgress = false;
  }

  ngOnInit() {
    this.loadData(this.page, this.size);
  }

  create() {
    const data = {
      title: 'Create a new Finding Category',
      action: 'create',
      label: 'Save Finding Category',
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

    const dialog = this.dialog.open(FindingCategoryDetailComponent, config);
    dialog.afterClosed().subscribe(response => {
      if (response.success) {
        this.loadData(this.page, this.size);
      }
    });
  }

  update(row: any) {
    const data = {
      title: 'Update Finding Category',
      action: 'update',
      label: 'Save Finding Category',
      row: row,
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

    const dialog = this.dialog.open(FindingCategoryDetailComponent, config);
    dialog.afterClosed().subscribe(response => {
      if (response.success) {
        this.loadData(this.page, this.size);
      }
    });
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
        this.showProgress = true;
        this.findingCategoryService.delete(id).subscribe({
          next: () => {
            this.loadData(this.page, this.size);
            this.toastService.success(
              'Success',
              'Finding Category Deleted Successfully!'
            );
            this.router.navigate(['/main/settings/finding-categories']);
          },
          error: () => (this.showProgress = false),
          complete: () => (this.showProgress = false),
        });
      }
    });
  }
}
