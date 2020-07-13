import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { OrganisationUnitService } from '../organisation-unit.service';
import { OrganisationUnitDeleteComponent } from '../organisation-unit-delete/organisation-unit-delete.component';
import { OrganisationUnit } from '../organisation-unit';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { ToastService } from '../../../shared/toast.service';
import { Page } from '../../../shared/page';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-organisation-unit-list',
  templateUrl: './organisation-unit-list.component.html',
  styleUrls: ['./organisation-unit-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisationUnitListComponent implements OnInit {
  displayedColumns = ['code', 'name', 'level', 'parent', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  totalItems: number;
  pageSizeOptions: number[];
  page: number;
  size: number;
  sortBy: string;
  queryString: string;

  private OrganisationUnitSubject: BehaviorSubject<
    OrganisationUnit[]
  > = new BehaviorSubject([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private organisationUnitService: OrganisationUnitService,
    private titleService: Title,
    private toastService: ToastService
  ) {
    this.titleService.setTitle('Organisation Units|' + environment.app);
    this.page = Page.page;
    this.size = Page.size;
    this.pageSizeOptions = Page.perPageOptions;
    this.queryString = '_';
    this.sortBy = 'name';
  }

  ngOnInit() {
    this.loadPage(this.page, this.size, this.sortBy, this.queryString);
  }

  loadPage(page: number, size: number, sortBy: string, queryString: string) {
    this.organisationUnitService
      .getPage({
        page,
        size,
        sort: ['name,asc'],
        queryString,
      })
      .subscribe(
        resp => {
          this.onSuccess(resp.body, resp.headers);
        },
        error => {
          this.onError();
        }
      );
  }

  private onSuccess(data: OrganisationUnit[] | null, headers: HttpHeaders) {
    this.OrganisationUnitSubject.next(data || []);
    this.totalItems = parseInt(headers.get('x-total-count') || '0', 10);
  }

  getData(): Observable<OrganisationUnit[]> {
    return this.OrganisationUnitSubject.asObservable();
  }

  onError(): void {}

  pageChange($event: PageEvent) {
    this.size = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage(this.page, this.size, this.sortBy, this.queryString);
  }

  delete(id: number, organisationUnit: OrganisationUnit) {
    const dialogRef = this.dialog.open(OrganisationUnitDeleteComponent, {
      data: organisationUnit,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.organisationUnitService.delete(id).subscribe({
          next: () => {
            this.loadPage(this.page, this.size, this.sortBy, this.queryString);
            this.toastService.success(
              'Success',
              'Organisation Unit Deleted Successfully!'
            );
            this.router.navigate(['/settings/organisation-units']);
          },
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
