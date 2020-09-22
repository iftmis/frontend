import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { HttpHeaders } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';
import { RiskRegister } from '../risk-register';
import { RiskRegisterService } from '../risk-register.service';
import { ToastService } from '../../../shared/toast.service';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { RiskRegisterDeleteComponent } from '../risk-register-delete/risk-register-delete.component';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { FinancialYearService } from '../../../setting/financial-year/financial-year.service';
import { FinancialYear } from '../../../setting/financial-year/financial-year';
import { OrganisationUnitService } from '../../../setting/organisation-unit/organisation-unit.service';
import { RiskRegisterApproveComponent } from '../risk-register-approve/risk-register-approve.component';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-risk-register-list',
  templateUrl: './risk-register-list.component.html',
  styleUrls: ['./risk-register-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskRegisterListComponent implements OnInit {
  displayedColumns = [
    'id',
    'risk',
    'financialYear',
    'organisationUnit',
    'formActions',
  ];
  routeData$ = this.route.data;
  showLoader = false;

  riskRegisterSubject: BehaviorSubject<RiskRegister[]> = new BehaviorSubject(
    []
  );
  financialYearSubject: BehaviorSubject<FinancialYear[]> = new BehaviorSubject(
    []
  );
  last5FinancialYears: FinancialYear[];
  totalItems = 0;
  size: number;
  pageSizeOptions: number[];
  page: number;

  financialYear: FinancialYear;
  financialYearId: number;
  organisationUnitId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private titleService: Title,
    private toastService: ToastService,
    private riskRegisterService: RiskRegisterService,
    private financialYearService: FinancialYearService
  ) {
    this.page = 0;
    this.size = ITEMS_PER_PAGE;
    this.pageSizeOptions = PAGE_SIZE_OPTIONS;
    this.financialYearId = 0;
    this.titleService.setTitle('Risk Register|' + environment.app);
  }

  ngOnInit() {
    this.loadLast5Years();
  }

  loadLast5Years() {
    this.financialYearService
      .getAll({
        page: 0,
        size: 5,
      })
      .subscribe(
        resp => this.onSuccessFinancialYears(resp.body),
        () => this.onError()
      );
  }

  loadData(page: number, size: number, financialYearId: number) {
    this.riskRegisterService.getAllPaged(page, size, financialYearId).subscribe(
      resp => this.onSuccess(resp.body, resp.headers),
      () => this.onError()
    );
  }

  getData(): Observable<RiskRegister[]> {
    return this.riskRegisterSubject.asObservable();
  }

  getFinancialYears(): Observable<FinancialYear[]> {
    return this.financialYearSubject.asObservable();
  }

  delete(id: number, riskRegister: RiskRegister) {
    const dialogRef = this.dialog.open(RiskRegisterDeleteComponent, {
      data: riskRegister,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.riskRegisterService.delete(id).subscribe({
          next: () => {
            this.loadData(this.page, this.size, this.financialYearId);
            this.toastService.success('Success', 'Risk Deleted Successfully!');
            this.router.navigate(['/risk-management/risk-register']);
          },
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }

  onSuccess(data: any, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.riskRegisterSubject.next(data);
  }

  onSuccessFinancialYears(data: any): void {
    this.financialYearSubject.next(data);
    const items = data as FinancialYear[];
    items.forEach(row => {
      if (row.isOpened) {
        this.financialYear = row;
        this.financialYearId = row.id as number;
        this.loadData(this.page, this.size, this.financialYearId);
      }
    });
  }

  onError(): void {}

  pageChange($event: PageEvent) {
    this.size = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadData(this.page, this.size, this.financialYearId);
  }

  approve(id: number, element: RiskRegister) {
    const dialogRef = this.dialog.open(RiskRegisterApproveComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.riskRegisterService.approve(id).subscribe({
          next: () => {
            this.loadData(this.page, this.size, this.financialYearId);
            this.toastService.success('Success', 'Risk Approved Successfully!');
            this.router.navigate(['/risk-management/risk-register']);
          },
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }

  loadByFinancialYear(event: MatSelectionListChange) {
    this.financialYear = event.option.value;
    this.financialYearId = event.option.value.id;
    this.loadData(this.page, this.size, event.option.value.id);
  }
}
