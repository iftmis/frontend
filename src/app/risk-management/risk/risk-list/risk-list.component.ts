import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { RiskService } from '../risk.service';
import { RiskDeleteComponent } from '../risk-delete/risk-delete.component';
import { Risk } from '../risk';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { FinancialYear } from '../../../setting/financial-year/financial-year';
import { RiskRegister } from '../../risk-register/risk-register';
import { RiskRegisterService } from '../../risk-register/risk-register.service';
import { OrganisationUnit } from '../../../setting/organisation-unit/organisation-unit';
import { ITreeState, TreeComponent } from 'angular-tree-component';
import { OrganisationUnitService } from '../../../setting/organisation-unit/organisation-unit.service';
import { HttpHeaders } from '@angular/common/http';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { PageEvent } from '@angular/material/paginator';
import { RiskDetailComponent } from '../risk-detail/risk-detail.component';
import { ToastService } from '../../../shared/toast.service';
import { RiskRankService } from '../../../setting/risk-rank/risk-rank.service';
import { RiskRank } from '../../../setting/risk-rank/risk-rank';
import { RiskRegisterApproveComponent } from '../../risk-register/risk-register-approve/risk-register-approve.component';
import { User } from '../../../security/user';

@Component({
  selector: 'app-risk-list',
  templateUrl: './risk-list.component.html',
  styleUrls: ['./risk-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskListComponent implements OnInit {
  showLoader = false;
  riskRegisterId: string;
  riskRegister: RiskRegister;
  totalItems: number;
  size: number;
  pageSizeOptions: number[];
  page: number;
  riskSubject: BehaviorSubject<Risk[]> = new BehaviorSubject([]);
  riskRegisterSubject$: ReplaySubject<RiskRegister> = new ReplaySubject(1);
  queryString: string;
  ranks: RiskRank[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private riskService: RiskService,
    private riskRegisterService: RiskRegisterService,
    private actRoute: ActivatedRoute,
    private organisationUnitService: OrganisationUnitService,
    private toastService: ToastService,
    private riskRankService: RiskRankService
  ) {
    this.totalItems = 0;
    this.page = 0;
    this.size = ITEMS_PER_PAGE;
    this.pageSizeOptions = PAGE_SIZE_OPTIONS;
    this.riskRegisterId = this.actRoute.snapshot.params.id;
    this.queryString = '_';
  }

  ngOnInit() {
    this.loadRiskRegister(Number(this.riskRegisterId));

    this.loadRisk(this.page, this.size, Number(this.riskRegisterId));
    this.loadRanks();
  }

  loadRanks() {
    this.riskRankService.getAllUnPaged().subscribe(
      response => {
        this.ranks = response;
      },
      error => {}
    );
  }

  loadRiskRegister(id: number) {
    this.riskRegisterService.getById(id).subscribe(
      response => {
        this.riskRegister = response;
        this.riskRegisterSubject$.next(response);
      },
      error => {}
    );
  }

  get riskRegister$(): Observable<RiskRegister> {
    return this.riskRegisterSubject$.asObservable();
  }

  loadRisk(page: number, size: number, riskRegisterId: number) {
    this.riskService.getAllPaged(riskRegisterId, page, size).subscribe(
      resp => this.onSuccess(resp.body, resp.headers),
      () => this.onError()
    );
  }

  pageChange(event: PageEvent) {
    this.size = event.pageSize;
    this.page = event.pageIndex;
    this.loadRisk(this.page, this.size, Number(this.riskRegisterId));
  }

  onSuccess(data: any, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.riskSubject.next(data);
  }

  getData(): Observable<Risk[]> {
    return this.riskSubject.asObservable();
  }

  countRisks(): number {
    return this.riskSubject.getValue().length;
  }

  onError(): void {}

  delete(id: number, risk: Risk) {
    const dialogRef = this.dialog.open(RiskDeleteComponent, {
      data: risk,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.riskService.delete(id).subscribe({
          next: () => {
            this.toastService.success('Success!', 'Risk Deleted Successfully!');
            this.router.navigate([
              '/risk-management/risk-register',
              this.riskRegisterId,
              'risks',
            ]);
          },
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }

  create() {
    const data = {
      riskRegister: this.riskRegister,
      action: 'create',
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = data;
    const dialog = this.dialog.open(RiskDetailComponent, dialogConfig);

    dialog.afterClosed().subscribe((response: any) => {
      if (response) {
        this.loadRisk(this.page, this.size, Number(this.riskRegisterId));
        this.toastService.success('Success!', 'Risk Created Successfully!');
      }
    });
  }

  edit(row: Risk) {
    const data = {
      riskRegister: this.riskRegister,
      action: 'update',
      risk: row,
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = data;
    const dialog = this.dialog.open(RiskDetailComponent, dialogConfig);

    dialog.afterClosed().subscribe((response: any) => {
      if (response) {
        this.loadRisk(this.page, this.size, Number(this.riskRegisterId));
        this.toastService.success('Success!', 'Risk Updated Successfully!');
      }
    });
  }

  likelihood(risk: Risk, source: string) {
    let likelihood = 0;
    if (risk.riskRatings) {
      risk.riskRatings.forEach(row => {
        if (row.source.toString() === source) {
          likelihood = row.likelihood;
        }
      });
    }
    return likelihood;
  }

  impact(risk: Risk, source: string) {
    let impact = 0;
    if (risk.riskRatings) {
      risk.riskRatings?.forEach(row => {
        if (row.source.toString() === source) {
          impact = row.impact;
        }
      });
    }
    return impact;
  }

  status(risk: Risk, source: string) {
    let status = 0;
    if (risk.riskRatings) {
      risk.riskRatings?.forEach(row => {
        if (row.source.toString() === source) {
          const likelihood = row.likelihood;
          const impact = row.impact;
          status = likelihood * impact;
        }
      });
    }
    return status;
  }

  resolveColor(status: number) {
    let color = '#43A047';
    this.ranks?.forEach(row => {
      const min = row.minValue;
      const max = row.maxValue;
      if (status >= min && status <= max) {
        // @ts-ignore
        color = row.hexColor;
      }
    });
    return color;
  }

  approve() {
    const dialogRef = this.dialog.open(RiskRegisterApproveComponent, {
      data: this.riskRegister,
    });
    const id = Number(this.riskRegisterId);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.riskRegisterService.approve(id).subscribe({
          next: () => {
            this.toastService.success(
              'Success',
              'Risk Register Approved Successfully!'
            );
            this.router.navigate(['/risk-management/risk-register']);
          },
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
        });
      }
    });
  }
}
