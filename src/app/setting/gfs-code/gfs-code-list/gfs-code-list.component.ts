import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { GfsCodeService } from '../gfs-code.service';
import { GfsCodeDeleteComponent } from '../gfs-code-delete/gfs-code-delete.component';
import { GfsCode } from '../gfs-code';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { ToastService } from '../../../shared/toast.service';
import { GfsCodeDetailComponent } from '../gfs-code-detail/gfs-code-detail.component';

@Component({
  selector: 'app-gfs-code-list',
  templateUrl: './gfs-code-list.component.html',
  styleUrls: ['./gfs-code-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GfsCodeListComponent implements OnInit {
  displayedColumns = ['code', 'description', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;
  page!: number;

  private GfsCodeSubject: BehaviorSubject<GfsCode[]> = new BehaviorSubject([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private gfsCodeService: GfsCodeService,
    private titleService: Title,
    private toastService: ToastService
  ) {
    this.titleService.setTitle('GFS Codes|' + environment.app);
  }

  ngOnInit() {
    this.loadPage();
  }

  create() {
    const data = {
      title: 'Create a new GFS Code',
      action: 'create',
      label: 'Save GFS Code',
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

    const dialog = this.dialog.open(GfsCodeDetailComponent, config);
    dialog.afterClosed().subscribe(response => {
      if (response.success) {
        this.loadPage();
      }
    });
  }

  update(row: any) {
    const data = {
      title: 'Update GFS Code',
      action: 'update',
      label: 'Save GFS Code',
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

    const dialog = this.dialog.open(GfsCodeDetailComponent, config);
    dialog.afterClosed().subscribe(response => {
      if (response.success) {
        this.loadPage();
      }
    });
  }

  loadPage() {
    const pageToLoad = this.page || 0;
    this.gfsCodeService
      .query({
        page: pageToLoad,
        size: this.itemsPerPage,
      })
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers, this.page),
        () => this.onError()
      );
  }
  getData(): Observable<GfsCode[]> {
    return this.GfsCodeSubject.asObservable();
  }

  onSuccess(data: any, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.GfsCodeSubject.next(data);
  }
  onError(): void {}

  pageChange($event: PageEvent) {
    this.itemsPerPage = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage();
  }

  delete(id: number, gfsCode: GfsCode) {
    const dialogRef = this.dialog.open(GfsCodeDeleteComponent, {
      data: gfsCode,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.gfsCodeService.delete(id).subscribe({
          next: () => {
            this.loadPage();
            this.toastService.success(
              'Success',
              'GFS Code Deleted Successfully!'
            );
            this.router.navigate(['/settings/gfs-codes']);
          },
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
