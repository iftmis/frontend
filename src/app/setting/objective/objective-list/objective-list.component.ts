import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ObjectiveService } from '../objective.service';
import { ObjectiveDeleteComponent } from '../objective-delete/objective-delete.component';
import { Objective } from '../objective';
import { BehaviorSubject, Observable } from 'rxjs';

import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { Title } from '@angular/platform-browser';
import { ToastService } from '../../../shared/toast.service';
import { environment } from '../../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-objective-list',
  templateUrl: './objective-list.component.html',
  styleUrls: ['./objective-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectiveListComponent implements OnInit {
  displayedColumns = ['code', 'description', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  objectiveListSubject: BehaviorSubject<Objective[]> = new BehaviorSubject([]);

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
    private objectiveService: ObjectiveService
  ) {
    this.titleService.setTitle('Objective List|' + environment.app);
  }

  ngOnInit() {
    this.loadPage();
  }

  delete(id: number, objective: Objective) {
    const dialogRef = this.dialog.open(ObjectiveDeleteComponent, {
      data: objective,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.objectiveService.delete(id).subscribe({
          next: () => {
            this.loadPage();
            this.toastService.success(
              'Success',
              'Objective Deleted Successfully!'
            );
            this.router.navigate(['/settings/objectives']);
          },
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }

  getData(): Observable<Objective[]> {
    return this.objectiveListSubject.asObservable();
  }

  loadPage() {
    const pageToLoad = this.page || 0;
    this.objectiveService
      .getAllPaged({
        page: pageToLoad,
        size: this.itemsPerPage,
      })
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers, this.page),
        () => this.onError()
      );
  }
  onSuccess(data: any, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.objectiveListSubject.next(data);
  }

  onError(): void {}

  pageChange($event: PageEvent) {
    this.itemsPerPage = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage();
  }
}
