import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private titleService: Title,
    private subAreaService: SubAreaService
  ) {
    this.titleService.setTitle('Sub Areas|' + environment.app);
  }

  loadPage() {
    const pageToLoad = this.page || 0;
    this.subAreaService
      .getAllPaged({
        page: pageToLoad,
        size: this.itemsPerPage,
      })
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers, this.page),
        () => this.onError()
      );
  }

  getData(): Observable<SubArea[]> {
    return this.subAreaSubject.asObservable();
  }

  ngOnInit() {
    this.loadPage();
  }

  delete(id: number, subArea: SubArea) {
    const dialogRef = this.dialog.open(SubAreaDeleteComponent, {
      data: subArea,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.subAreaService.delete(id).subscribe({
          next: () => this.router.navigate(['/settings/sub-areas']),
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
    this.loadPage();
  }
}
