import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { ITreeState, TreeComponent } from 'angular-tree-component';

@Component({
  selector: 'app-organisation-unit-list',
  templateUrl: './organisation-unit-list.component.html',
  styleUrls: ['./organisation-unit-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganisationUnitListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['code', 'name', 'level', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

  totalItems: number;
  pageSizeOptions: number[];
  page: number;
  size: number;
  sortBy: string;
  queryString: string;

  OrganisationUnitSubject: BehaviorSubject<
    OrganisationUnit[]
  > = new BehaviorSubject([]);
  nodes: BehaviorSubject<any> = new BehaviorSubject([]);
  options = {
    getChildren: this.getChildren.bind(this),
  };
  parentId: any = 0;
  @ViewChild('tree') tree: TreeComponent;

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
    this.parentId = this.state?.focusedNodeId;
    this.organisationUnitService.getByUser().subscribe(resp => {
      this.nodes.next(this.mapToNode(resp));
      const ou = resp[0];
      if (this.parentId === undefined && ou !== undefined) {
        this.parentId = ou.id;
      }
      this.loadPage(0);
    });
  }

  loadPage(page: number) {
    this.organisationUnitService
      .getPage({
        page,
        size: this.size,
        sort: ['name,asc'],
        'parentId.equals': this.parentId,
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

  getChildren(node: any) {
    return new Promise((resolve, reject) => {
      this.organisationUnitService.getByParent(node.id).subscribe(resp => {
        resolve(this.mapToNode(resp));
      });
    });
  }

  mapToNode(ous: OrganisationUnit[]) {
    return ous.map(o => {
      return { id: o.id, name: o.name, hasChildren: true };
    });
  }

  onOuChange($e: any) {
    this.parentId = $e.node.data.id;
    this.loadPage(0);
  }

  get state(): ITreeState {
    return localStorage.treeState && JSON.parse(localStorage.treeState);
  }
  set state(state) {
    localStorage.treeState = JSON.stringify(state);
  }

  private onSuccess(data: OrganisationUnit[] | null, headers: HttpHeaders) {
    this.OrganisationUnitSubject.next(data || []);
    this.totalItems = parseInt(headers.get('x-total-count') || '0', 10);
  }

  onError(): void {}

  getData(): Observable<OrganisationUnit[]> {
    return this.OrganisationUnitSubject.asObservable();
  }

  pageChange($event: PageEvent) {
    this.size = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage(this.page);
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
            this.loadPage(this.page);
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

  ngAfterViewInit(): void {
    // if (parentId) {
    //   console.log(parentId)
    //   // @ts-ignore
    //   this.parent = {id: parentId}
    //   this.loadPage(0);
    // }
  }
}
