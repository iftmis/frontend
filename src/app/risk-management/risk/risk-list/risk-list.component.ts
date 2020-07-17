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
import { BehaviorSubject, Observable } from 'rxjs';
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

@Component({
  selector: 'app-risk-list',
  templateUrl: './risk-list.component.html',
  styleUrls: ['./risk-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskListComponent implements OnInit {
  /*displayedColumns = [
    'id',
    'code',
    'description',
    'objective',
    'category',
    'owner',
    /!*'rating',*!/
    'formActions',
  ];*/
  displayedColumns: string[] = ['position', 'name', 'weight'];
  routeData$ = this.route.data;
  showLoader = false;
  riskRegisterId: string;
  riskRegister: RiskRegister;
  selectedOrganisationUnit: OrganisationUnit;
  nodes: BehaviorSubject<any> = new BehaviorSubject([]);
  options = {
    getChildren: this.getChildren.bind(this),
  };
  parentId: any = 0;
  @ViewChild('tree') tree: TreeComponent;
  totalItems: number;
  size: number;
  pageSizeOptions: number[];
  page: number;
  riskSubject: BehaviorSubject<Risk[]> = new BehaviorSubject([]);
  queryString: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private riskService: RiskService,
    private riskRegisterService: RiskRegisterService,
    private actRoute: ActivatedRoute,
    private organisationUnitService: OrganisationUnitService,
    private toastService: ToastService
  ) {
    this.totalItems = 0;
    this.page = 0;
    this.size = ITEMS_PER_PAGE;
    this.pageSizeOptions = PAGE_SIZE_OPTIONS;
    this.riskRegisterId = this.actRoute.snapshot.params.id;
    this.queryString = '_';
  }

  ngOnInit() {
    this.loadRiskRegister();
    this.parentId = this.state?.focusedNodeId;

    this.loadOrganisationUnits();

    this.loadRisk(
      this.page,
      this.size,
      Number(this.riskRegisterId),
      this.parentId,
      this.queryString
    );
  }

  loadOrganisationUnits() {
    this.organisationUnitService.getByUser().subscribe(resp => {
      this.nodes.next(this.mapToNode(resp));
      const ou = resp[0];
      if (this.parentId === undefined && ou !== undefined) {
        this.parentId = ou.id;
      }
    });
  }

  loadRiskRegister() {
    const id = Number(this.riskRegisterId);
    this.riskRegisterService.getById(id).subscribe(
      response => {
        this.riskRegister = response;
      },
      error => {}
    );
  }

  loadRisk(
    page: number,
    size: number,
    riskRegisterId: number,
    riskOwnerId: number,
    query: string
  ) {
    if (query === '_') {
      this.riskService
        .getAllPaged({
          page,
          size,
          sort: ['code,asc'],
          'riskRegisterId.equals': riskRegisterId,
          'riskOwnerId.equals': riskOwnerId,
        })
        .subscribe(
          resp => this.onSuccess(resp.body, resp.headers),
          () => this.onError()
        );
    } else {
      this.riskService
        .getAllPaged({
          page,
          size,
          sort: ['code,asc'],
          'riskRegisterId.equals': riskRegisterId,
          'riskOwnerId.equals': riskOwnerId,
          'code.contains': query.toLowerCase(),
        })
        .subscribe(
          resp => this.onSuccess(resp.body, resp.headers),
          () => this.onError()
        );
    }
  }

  pageChange($event: PageEvent) {
    const riskOwnerId = this.selectedOrganisationUnit.id as number;
    this.size = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadRisk(
      this.page,
      this.size,
      Number(this.riskRegisterId),
      riskOwnerId,
      this.queryString
    );
  }

  onSuccess(data: any, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.riskSubject.next(data);
  }

  getData(): Observable<Risk[]> {
    return this.riskSubject.asObservable();
  }

  onError(): void {}

  getChildren(node: any) {
    return new Promise((resolve, reject) => {
      this.organisationUnitService.getByParent(node.id).subscribe(resp => {
        resolve(this.mapToNode(resp));
      });
    });
  }

  mapToNode(ous: OrganisationUnit[]) {
    return ous.map(o => {
      return {
        id: o.id,
        name: o.name,
        organisationUnitLevel: o.organisationUnitLevel,
        hasChildren: true,
      };
    });
  }

  onOuChange($e: any) {
    this.parentId = $e.node.data.id;
    this.selectedOrganisationUnit = $e.node.data;
    this.loadRisk(
      this.page,
      this.size,
      Number(this.riskRegisterId),
      this.parentId,
      this.queryString
    );
  }

  get state(): ITreeState {
    return localStorage.treeState && JSON.parse(localStorage.treeState);
  }

  set state(state) {
    localStorage.treeState = JSON.stringify(state);
  }

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
      organisationUnit: this.selectedOrganisationUnit,
      action: 'create',
      parentId: this.parentId,
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    /*dialogConfig.height = '80%';*/
    dialogConfig.width = '60%';
    dialogConfig.data = data;
    const dialog = this.dialog.open(RiskDetailComponent, dialogConfig);

    dialog.afterClosed().subscribe((response: any) => {
      if (response) {
        this.loadRisk(
          this.page,
          this.size,
          Number(this.riskRegisterId),
          this.parentId,
          this.queryString
        );
        this.toastService.success('Success!', 'Risk Created Successfully!');
      }
    });
  }

  edit(row: Risk) {
    const data = {
      riskRegister: this.riskRegister,
      organisationUnit: this.selectedOrganisationUnit,
      action: 'update',
      risk: row,
      parentId: this.parentId,
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    /*dialogConfig.height = '80%';*/
    dialogConfig.width = '60%';
    dialogConfig.data = data;
    const dialog = this.dialog.open(RiskDetailComponent, dialogConfig);

    dialog.afterClosed().subscribe((response: any) => {
      if (response) {
        this.loadRisk(
          this.page,
          this.size,
          Number(this.riskRegisterId),
          this.parentId,
          this.queryString
        );
        this.toastService.success('Success!', 'Risk Updated Successfully!');
      }
    });
  }

  filter(query: string) {
    if (query.length > 2) {
      this.queryString = query.toLowerCase();
      this.loadRisk(
        this.page,
        this.size,
        Number(this.riskRegisterId),
        this.parentId,
        this.queryString
      );
    } else {
      this.queryString = '_';
      this.loadRisk(
        this.page,
        this.size,
        Number(this.riskRegisterId),
        this.parentId,
        this.queryString
      );
    }
  }
}
