import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
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

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleListComponent implements OnInit {
  displayedColumns = ['id', 'role', 'formActions'];
  routeData$ = this.route.data;
  showLoader = false;

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
    this.titleService.setTitle('Roles|' + environment.app);
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
        this.showLoader = true;
        this.roleService.delete(id).subscribe({
          next: () => {
            this.loadPage();
            this.toastService.success('Success', 'Role Deleted Successfully!');
            this.router.navigate(['/user-management/roles']);
          },
          error: () => (this.showLoader = false),
          complete: () => (this.showLoader = false),
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
