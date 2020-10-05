import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { ProcedureDeleteComponent } from '../procedure-delete/procedure-delete.component';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { ToastService } from '../../../shared/toast.service';
import { PageEvent } from '@angular/material/paginator';
import { Procedure } from '../procedure';
import { Title } from '@angular/platform-browser';
import { ProcedureService } from '../procedure.service';
import { environment } from '../../../../environments/environment';
import { ProcedureDetailComponent } from '../procedure-detail/procedure-detail.component';

@Component({
  selector: 'app-procedure-list',
  templateUrl: './procedure-list.component.html',
  styleUrls: ['./procedure-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcedureListComponent implements OnInit {
  displayedColumns = ['id', 'procedure', 'indicator', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  procedureSubject: BehaviorSubject<Procedure[]> = new BehaviorSubject([]);

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
    private procedureService: ProcedureService
  ) {
    this.titleService.setTitle('Procedures|' + environment.app);
  }

  loadPage() {
    const pageToLoad = this.page || 0;
    this.procedureService
      .getAllPaged({
        page: pageToLoad,
        size: this.itemsPerPage,
      })
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers, this.page),
        () => this.onError()
      );
  }

  getData(): Observable<Procedure[]> {
    return this.procedureSubject.asObservable();
  }

  ngOnInit() {
    this.loadPage();
  }

  delete(id: number, procedure: Procedure) {
    const dialogRef = this.dialog.open(ProcedureDeleteComponent, {
      data: procedure,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.procedureService.delete(id).subscribe({
          next: () => {
            this.loadPage();
            this.toastService.success(
              'Success',
              'Procedure Deleted Successfully!'
            );
            this.router.navigate(['/main/settings/procedures']);
          },
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }

  create() {
    const data = {
      title: 'Create a Procedure',
      action: 'create',
      label: 'Save Procedure',
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

    this.dialog.open(ProcedureDetailComponent, config);
  }

  onSuccess(data: any, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.procedureSubject.next(data);
  }

  onError(): void {}

  pageChange($event: PageEvent) {
    this.itemsPerPage = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage();
  }
}
