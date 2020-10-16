import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { AuditableAreaService } from '../auditable-area.service';
import { AuditableAreaDeleteComponent } from '../auditable-area-delete/auditable-area-delete.component';
import { AuditableArea } from '../auditable-area';
import { HttpHeaders } from '@angular/common/http';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { ToastService } from '../../../shared/toast.service';
import { AuditableAreaDetailComponent } from '../auditable-area-detail/auditable-area-detail.component';

@Component({
  selector: 'app-auditable-area-list',
  templateUrl: './auditable-area-list.component.html',
  styleUrls: ['./auditable-area-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditableAreaListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['code', 'name', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  auditableAreaSubject: BehaviorSubject<AuditableArea[]> = new BehaviorSubject(
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
    private toastService: ToastService,
    private auditableAreaService: AuditableAreaService
  ) {
    this.titleService.setTitle('Auditable Areas|' + environment.app);
  }
  ngAfterViewInit(): void {
    this.loadPage();
  }

  create() {
    const data = {
      title: 'Create a new Auditable Area',
      action: 'create',
      label: 'Save Auditable Area',
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

    const dialog = this.dialog.open(AuditableAreaDetailComponent, config);
    dialog.afterClosed().subscribe(response => {
      if (response.success) {
        this.loadPage();
      }
    });
  }

  update(row: any) {
    const data = {
      title: 'Update a new Auditable Area',
      action: 'update',
      label: 'Save Auditable Area',
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

    const dialog = this.dialog.open(AuditableAreaDetailComponent, config);
    dialog.afterClosed().subscribe(response => {
      if (response.success) {
        this.loadPage();
      }
    });
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

  getData(): Observable<AuditableArea[]> {
    return this.auditableAreaSubject.asObservable();
  }

  ngOnInit() {}

  delete(id: number, auditableArea: AuditableArea) {
    const dialogRef = this.dialog.open(AuditableAreaDeleteComponent, {
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
              'Auditable Area Deleted Successfully!'
            );
            this.router.navigate(['/settings/auditable-areas']);
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
