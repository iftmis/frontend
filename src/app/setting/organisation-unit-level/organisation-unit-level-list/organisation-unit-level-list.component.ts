import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { OrganisationUnitLevelService } from '../organisation-unit-level.service';
import { OrganisationUnitLevelDeleteComponent } from '../organisation-unit-level-delete/organisation-unit-level-delete.component';
import { OrganisationUnitLevel } from '../organisation-unit-level';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { HttpHeaders } from '@angular/common/http';
import { ToastService } from '../../../shared/toast.service';
import { OrganisationUnitLevelDetailComponent } from '../organisation-unit-level-detail/organisation-unit-level-detail.component';

@Component({
  selector: 'app-organisation-unit-level-list',
  templateUrl: './organisation-unit-level-list.component.html',
  styleUrls: ['./organisation-unit-level-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisationUnitLevelListComponent implements OnInit {
  displayedColumns = ['code', 'name', 'level', 'formActions'];
  routeData$ = this.route.data;
  showProgress = false;

  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;
  page!: number;

  private OrganisationUnitLevelSubject: BehaviorSubject<
    OrganisationUnitLevel[]
  > = new BehaviorSubject([]);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private organisationUnitLevelService: OrganisationUnitLevelService,
    private titleService: Title,
    private toastService: ToastService
  ) {
    this.titleService.setTitle('Organisation Unit Levels | ' + environment.app);
  }

  ngOnInit() {
    this.loadPage();
  }

  create() {
    const data = {
      title: 'Create a new Organization Unit Level',
      action: 'create',
      label: 'Save OrganisationUnit Level',
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

    const dialog = this.dialog.open(
      OrganisationUnitLevelDetailComponent,
      config
    );
    dialog.afterClosed().subscribe(response => {
      if (response.success) {
        this.loadPage();
      }
    });
  }

  loadPage() {
    const pageToLoad = this.page || 0;
    this.organisationUnitLevelService
      .query({
        page: pageToLoad,
        size: this.itemsPerPage,
      })
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers, this.page),
        () => this.onError()
      );
  }

  getData(): Observable<OrganisationUnitLevel[]> {
    return this.OrganisationUnitLevelSubject.asObservable();
  }

  onSuccess(data: any, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.OrganisationUnitLevelSubject.next(data);
  }

  onError(): void {}

  pageChange($event: PageEvent) {
    this.itemsPerPage = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage();
  }

  delete(id: number, organisationUnitLevel: OrganisationUnitLevel) {
    const dialogRef = this.dialog.open(OrganisationUnitLevelDeleteComponent, {
      data: organisationUnitLevel,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showProgress = true;
        this.organisationUnitLevelService.delete(id).subscribe({
          next: () => {
            this.loadPage();
            this.toastService.success(
              'Success',
              'Organisation Unit Level Deleted Successfully!'
            );
            this.router.navigate(['/main/settings/organisation-unit-levels']);
          },

          error: () => (this.showProgress = false),
          complete: () => (this.showProgress = false),
        });
      }
    });
  }
}
