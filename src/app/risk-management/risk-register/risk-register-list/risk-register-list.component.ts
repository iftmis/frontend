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
import { FormControl } from '@angular/forms';
import { FinancialYearService } from '../../../setting/financial-year/financial-year.service';
import { FinancialYear } from '../../../setting/financial-year/financial-year';
import { AuditableArea } from '../../../setting/auditable-area/auditable-area';
import { OrganisationUnit } from '../../../setting/organisation-unit/organisation-unit';
import { OrganisationUnitService } from '../../../setting/organisation-unit/organisation-unit.service';

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

  financialYearControl = new FormControl(null);
  financialYears: FinancialYear[];

  organisationUnitControl = new FormControl(null);
  organisationUnits: OrganisationUnit[];

  totalItems = 0;
  size: number;
  pageSizeOptions: number[];
  page: number;
  financialYearId: number;
  organisationUnitId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private titleService: Title,
    private toastService: ToastService,
    private riskRegisterService: RiskRegisterService,
    private financialYearService: FinancialYearService,
    private organisationUnitService: OrganisationUnitService
  ) {
    this.page = 0;
    this.size = ITEMS_PER_PAGE;
    this.pageSizeOptions = PAGE_SIZE_OPTIONS;
    this.financialYearId = 0;
    this.organisationUnitId = 0;
    this.titleService.setTitle('Risk Register|' + environment.app);
  }

  ngOnInit() {
    this.loadPage(
      this.page,
      this.size,
      this.financialYearId,
      this.organisationUnitId
    );
    this.loadFinancialYears();
    this.loadCouncils();
  }

  loadPage(
    page: number,
    size: number,
    financialYearId: number,
    organisationUnitId: number
  ) {
    this.riskRegisterService
      .getAllPaged(page, size, financialYearId, organisationUnitId)
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers),
        () => this.onError()
      );
  }

  loadFinancialYears() {
    this.financialYearService.getAllUnPaged().subscribe(
      response => {
        this.financialYears = response;
      },
      error => {}
    );
  }

  loadCouncils() {
    this.organisationUnitService.getAllCouncils().subscribe(
      response => {
        this.organisationUnits = response;
      },
      error => {}
    );
  }

  getData(): Observable<RiskRegister[]> {
    return this.riskRegisterSubject.asObservable();
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
            this.loadPage(
              this.page,
              this.size,
              this.financialYearId,
              this.organisationUnitId
            );
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

  onError(): void {}

  pageChange($event: PageEvent) {
    this.size = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage(
      this.page,
      this.size,
      this.financialYearId,
      this.organisationUnitId
    );
  }

  filterByFinancialYear(financialYear: FinancialYear) {
    if (financialYear) {
      this.financialYearId = financialYear.id as number;
      this.loadPage(
        this.page,
        this.size,
        this.financialYearId,
        this.organisationUnitId
      );
    } else {
      this.financialYearId = 0 as number;
      this.loadPage(
        this.page,
        this.size,
        this.financialYearId,
        this.organisationUnitId
      );
    }
  }

  filterByOrganisationUnit(organisationUnit: OrganisationUnit) {
    if (organisationUnit) {
      this.organisationUnitId = organisationUnit.id as number;
      this.loadPage(
        this.page,
        this.size,
        this.financialYearId,
        this.organisationUnitId
      );
    } else {
      this.organisationUnitId = 0 as number;
      this.loadPage(
        this.page,
        this.size,
        this.financialYearId,
        this.organisationUnitId
      );
    }
  }
}
