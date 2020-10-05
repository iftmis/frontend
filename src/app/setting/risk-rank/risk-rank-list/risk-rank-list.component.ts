import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { ToastService } from '../../../shared/toast.service';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { RiskRankService } from '../risk-rank.service';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { RiskRank } from '../risk-rank';
import { RiskRankDeleteComponent } from '../risk-rank-delete/risk-rank-delete.component';
import { environment } from '../../../../environments/environment';
import { RiskRankDetailComponent } from '../risk-rank-detail/risk-rank-detail.component';

@Component({
  selector: 'app-risk-rank-list',
  templateUrl: './risk-rank-list.component.html',
  styleUrls: ['./risk-rank-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskRankListComponent implements OnInit {
  displayedColumns = [
    'id',
    'name',
    'minValue',
    'maxValue',
    'hexColor',
    'formActions',
  ];
  routeData$ = this.route.data;
  showLoader = false;

  riskRankSubject: BehaviorSubject<RiskRank[]> = new BehaviorSubject([]);

  totalItems = 0;
  size: number;
  pageSizeOptions: number[];
  page: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private titleService: Title,
    private toastService: ToastService,
    private riskRankService: RiskRankService
  ) {
    this.page = 0;
    this.size = ITEMS_PER_PAGE;
    this.pageSizeOptions = PAGE_SIZE_OPTIONS;
    this.titleService.setTitle('Risk Ranks|' + environment.app);
  }

  ngOnInit() {
    this.loadPage(this.page, this.size);
  }

  create() {
    const data = {
      title: 'Creates a new Risk Rank',
      action: 'create',
      label: 'Save Risk Rank',
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

    const dialog = this.dialog.open(RiskRankDetailComponent, config);
    dialog.afterClosed().subscribe(response => {
      if (response.success) {
        this.loadPage(this.page, this.size);
      }
    });
  }

  loadPage(page: number, size: number) {
    this.riskRankService.getAllPaged(page, size).subscribe(
      resp => this.onSuccess(resp.body, resp.headers),
      () => this.onError()
    );
  }

  getData(): Observable<RiskRank[]> {
    return this.riskRankSubject.asObservable();
  }

  delete(id: number, riskRank: RiskRank) {
    const dialogRef = this.dialog.open(RiskRankDeleteComponent, {
      data: riskRank,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.riskRankService.delete(id).subscribe({
          next: () => {
            this.loadPage(this.page, this.size);
            this.toastService.success(
              'Success',
              'Risk Rank Deleted Successfully!'
            );
            this.router.navigate(['/settings/risk-ranks']);
          },
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }

  onSuccess(data: any, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.riskRankSubject.next(data);
  }

  onError(): void {}

  pageChange($event: PageEvent) {
    this.size = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage(this.page, this.size);
  }
}
