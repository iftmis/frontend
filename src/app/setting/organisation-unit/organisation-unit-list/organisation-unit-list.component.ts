import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { OrganisationUnitService } from '../organisation-unit.service';
import { OrganisationUnitDeleteComponent } from '../organisation-unit-delete/organisation-unit-delete.component';
import { OrganisationUnit } from '../organisation-unit';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { HttpHeaders } from '@angular/common/http';
import { GfsCode } from '../../gfs-code/gfs-code';
import { ToastService } from '../../../shared/toast.service';

@Component({
  selector: 'app-organisation-unit-list',
  templateUrl: './organisation-unit-list.component.html',
  styleUrls: ['./organisation-unit-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisationUnitListComponent implements OnInit {
  displayedColumns = [
    'code',
    'name',
    'address',
    'phoneNumber',
    'email',
    'formActions',
  ];
  routeData$ = this.route.data;
  showLoader = false;

  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;
  page!: number;

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
  }

  ngOnInit() {
    this.loadPage();
  }

  loadPage() {
    const pageToLoad = this.page || 0;
    this.organisationUnitService
      .query({
        page: pageToLoad,
        size: this.itemsPerPage,
      })
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers, this.page),
        () => this.onError()
      );
  }
  getData(): Observable<OrganisationUnit[]> {
    return this.OrganisationUnitSubject.asObservable();
  }
  onSuccess(data: any, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.OrganisationUnitSubject.next(data);
  }
  onError(): void {}

  pageChange($event: PageEvent) {
    this.itemsPerPage = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage();
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
            this.loadPage();
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
