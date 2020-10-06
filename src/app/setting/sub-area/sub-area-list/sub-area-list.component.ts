import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { SubAreaService } from '../sub-area.service';
import { SubAreaDeleteComponent } from '../sub-area-delete/sub-area-delete.component';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { SubArea } from '../sub-area';
import { AuditableAreaService } from '../../auditable-area/auditable-area.service';
import { AuditableArea } from '../../auditable-area/auditable-area';
import { FormControl } from '@angular/forms';
import { SubAreaDetailComponent } from '../sub-area-detail/sub-area-detail.component';

@Component({
  selector: 'app-sub-area-list',
  templateUrl: './sub-area-list.component.html',
  styleUrls: ['./sub-area-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubAreaListComponent implements OnInit {
  displayedColumns = ['id', 'name', 'areaName', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  subAreaSubject: BehaviorSubject<SubArea[]> = new BehaviorSubject([]);

  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;
  page!: number;
  auditableAreas: AuditableArea[];
  auditableAreaControl = new FormControl(null);
  areaId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private titleService: Title,
    private subAreaService: SubAreaService,
    private areaService: AuditableAreaService
  ) {
    this.areaId = 0;
    this.titleService.setTitle('Sub Areas |' + environment.app);
  }

  ngOnInit() {
    this.loadPage(this.areaId);
    this.loadAuditableAreas();
  }

  create() {
    const data = {
      title: 'Create a new Sub Area',
      action: 'create',
      label: 'Save Sub Area',
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

    const dialog = this.dialog.open(SubAreaDetailComponent, config);
    dialog.afterClosed().subscribe(response => {
      if (response.success) {
        this.loadPage(this.areaId);
      }
    });
  }

  loadPage(auditableAreaId: number) {
    const pageToLoad = this.page || 0;
    this.subAreaService
      .getAllPaged(pageToLoad, this.itemsPerPage, auditableAreaId)
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers, this.page),
        () => this.onError()
      );
  }

  loadAuditableAreas() {
    this.areaService.getAllUnPaged().subscribe(resp => {
      this.auditableAreas = resp || [];
    });
  }

  getData(): Observable<SubArea[]> {
    return this.subAreaSubject.asObservable();
  }

  delete(id: number, subArea: SubArea) {
    const dialogRef = this.dialog.open(SubAreaDeleteComponent, {
      data: subArea,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.subAreaService.delete(id).subscribe({
          next: () => this.router.navigate(['/main/settings/sub-areas']),
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }

  onSuccess(data: any, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.subAreaSubject.next(data);
  }

  onError(): void {}

  pageChange($event: PageEvent) {
    this.itemsPerPage = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage(this.areaId);
  }

  filterSubAreaByArea(auditableArea: AuditableArea) {
    if (auditableArea) {
      this.areaId = auditableArea.id as number;
      this.loadPage(this.areaId);
    } else {
      this.areaId = 0 as number;
      this.loadPage(0);
    }
  }
}
