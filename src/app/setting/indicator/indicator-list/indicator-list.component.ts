import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastService } from '../../../shared/toast.service';
import { IndicatorService } from '../indicator.service';
import { Title } from '@angular/platform-browser';
import { IndicatorDeleteComponent } from '../indicator-delete/indicator-delete.component';
import { Indicator } from '../indicator';
import { environment } from '../../../../environments/environment';
import { FormControl } from '@angular/forms';
import { SubArea } from '../../sub-area/sub-area';
import { SubAreaService } from '../../sub-area/sub-area.service';
import { Page } from '../../../shared/page';
import { HttpHeaders } from '@angular/common/http';
import { IndicatorDetailComponent } from '../indicator-detail/indicator-detail.component';

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

  subAreaControl = new FormControl(null);
  subAreaId: number;
  indicatorSubject: BehaviorSubject<Indicator[]> = new BehaviorSubject([]);

  totalItems: number;
  pageSizeOptions: number[];
  page: number;
  size: number;
  subAreas: SubArea[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private titleService: Title,
    private toastService: ToastService,
    private indicatorService: IndicatorService,
    private subAreaService: SubAreaService
  ) {
    this.subAreaId = 0;
    this.page = Page.page;
    this.size = Page.size;
    this.pageSizeOptions = Page.perPageOptions;
    this.titleService.setTitle('Indicators|' + environment.app);
  }

  ngOnInit() {
    this.loadPage(this.page, this.size, this.subAreaId);
    this.loadSubAreas();
  }

  loadPage(page: number, size: number, subAreaId: number) {
    this.indicatorService.getAllPaged(page, size, subAreaId).subscribe(
      resp => this.onSuccess(resp.body, resp.headers),
      () => this.onError()
    );
  }

  onSuccess(data: any, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.indicatorSubject.next(data);
  }

  onError(): void {}

  loadSubAreas() {
    this.subAreaService.getAllUnPaged().subscribe(resp => {
      this.subAreas = resp || [];
    });
  }

  getData(): Observable<Indicator[]> {
    return this.indicatorSubject.asObservable();
  }

  create() {
    const data = {
      title: 'Create a new indicator',
      action: 'create',
      label: 'Save Indicator',
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

    const dialog = this.dialog.open(IndicatorDetailComponent, config);
    dialog.afterClosed().subscribe(response => {
      if (response.success) {
        this.loadPage(this.page, this.size, this.subAreaId);
      }
    });
  }

  update(row: any) {
    const data = {
      title: 'Update indicator',
      action: 'update',
      label: 'Save Indicator',
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

    const dialog = this.dialog.open(IndicatorDetailComponent, config);
    dialog.afterClosed().subscribe(response => {
      if (response.success) {
        this.loadPage(this.page, this.size, this.subAreaId);
      }
    });
  }

  delete(id: number, indicator: Indicator) {
    const dialogRef = this.dialog.open(IndicatorDeleteComponent, {
      data: indicator,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.indicatorService.delete(id).subscribe({
          next: () => {
            this.loadPage(this.page, this.size, this.subAreaId);
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

  pageChange($event: PageEvent) {
    this.size = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage(this.page, this.size, this.subAreaId);
  }

  filterIndicatorBySUbArea(subArea: SubArea) {
    if (subArea) {
      this.subAreaId = subArea.id as number;
      this.loadPage(this.page, this.size, this.subAreaId);
    } else {
      this.subAreaId = 0 as number;
      this.loadPage(this.page, this.size, this.subAreaId);
    }
  }
}
