import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { ToastService } from '../../../shared/toast.service';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { Role } from '../role';
import { RoleService } from '../role.service';
import { RoleDeleteComponent } from '../role-delete/role-delete.component';
import { RoleDetailComponent } from '../role-detail/role-detail.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleListComponent implements OnInit {
  displayedColumns = ['id', 'role', 'formActions'];
  routeData$ = this.route.data;
  public showProgress: boolean;

  roleSubject: BehaviorSubject<Role[]> = new BehaviorSubject([]);

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
    private roleService: RoleService
  ) {
    this.titleService.setTitle('Roles | ' + environment.app);
  }

  create() {
    const data = {
      title: 'Create a new Role',
      action: 'create',
      label: 'Save Role',
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

    const dialog = this.dialog.open(RoleDetailComponent, config);
    dialog.afterClosed().subscribe(response => {
      if (response.success) {
        this.loadPage();
      }
    });
  }

  loadPage() {
    const pageToLoad = this.page || 0;
    this.roleService
      .getAllPaged({
        page: pageToLoad,
        size: this.itemsPerPage,
      })
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers, this.page),
        () => this.onError()
      );
  }

  getData(): Observable<Role[]> {
    return this.roleSubject.asObservable();
  }

  ngOnInit() {
    this.loadPage();
  }

  delete(id: string, role: Role) {
    const dialogRef = this.dialog.open(RoleDeleteComponent, {
      data: role,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showProgress = true;
        this.roleService.delete(id).subscribe({
          next: () => {
            this.loadPage();
            this.toastService.success('Success', 'Role Deleted Successfully!');
            this.router.navigate(['/user-management/roles']);
          },
          error: () => (this.showProgress = false),
          complete: () => (this.showProgress = false),
        });
      }
    });
  }

  onSuccess(data: any, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.roleSubject.next(data);
  }

  onError(): void {}

  pageChange($event: PageEvent) {
    this.itemsPerPage = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage();
  }
}
