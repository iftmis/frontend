import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { HttpHeaders } from '@angular/common/http';
import {
  ITEMS_PER_PAGE,
  PAGE_SIZE_OPTIONS,
} from '../../../shared/pagination.constants';
import { ToastService } from '../../../shared/toast.service';
import { UserService } from '../user.service';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { User } from '../user';
import { environment } from '../../../../environments/environment';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  displayedColumns = [
    'id',
    'login',
    'firstName',
    'lastName',
    'email',
    'activated',
    'langKey',
    'authorities',
    'organisationUnit',
    'formActions',
  ];
  routeData$ = this.route.data;
  showLoader = false;

  userSubject: BehaviorSubject<User[]> = new BehaviorSubject([]);

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
    private userService: UserService
  ) {
    this.titleService.setTitle('Users|' + environment.app);
  }

  loadPage() {
    const pageToLoad = this.page || 0;
    this.userService
      .getAllPaged({
        page: pageToLoad,
        size: this.itemsPerPage,
      })
      .subscribe(
        resp => this.onSuccess(resp.body, resp.headers, this.page),
        () => this.onError()
      );
  }

  create() {
    const data = {
      title: 'Create a new User',
      action: 'create',
      label: 'Save User',
    };

    const config = new MatDialogConfig();
    config.data = data;
    config.width = '70%';
    config.position = {
      top: '80px',
    };
    config.panelClass = 'mat-dialog-box';
    config.backdropClass = 'mat-dialog-overlay';
    config.disableClose = true;
    config.autoFocus = false;

    const dialog = this.dialog.open(UserDetailComponent, config);
    dialog.afterClosed().subscribe(response => {
      if (response.success) {
        this.loadPage();
      }
    });
  }

  update(row: any) {
    const data = {
      title: `Update ${row.login} Account`,
      action: 'update',
      label: 'Update User Record',
      user: row,
    };

    const config = new MatDialogConfig();
    config.data = data;
    config.width = '70%';
    config.position = {
      top: '80px',
    };
    config.panelClass = 'mat-dialog-box';
    config.backdropClass = 'mat-dialog-overlay';
    config.disableClose = true;
    config.autoFocus = false;

    const dialog = this.dialog.open(UserDetailComponent, config);
    dialog.afterClosed().subscribe(response => {
      if (response.success) {
        this.loadPage();
      }
    });
  }

  getData(): Observable<User[]> {
    return this.userSubject.asObservable();
  }

  ngOnInit() {
    this.loadPage();
  }

  delete(id: number, user: User) {
    const dialogRef = this.dialog.open(UserDeleteComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoader = true;
        this.userService.delete(id).subscribe({
          next: () => {
            this.loadPage();
            this.toastService.success('Success', 'User Deleted Successfully!');
            this.router.navigate(['/user-management/users']);
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
    this.userSubject.next(data);
  }

  onError(): void {}

  pageChange($event: PageEvent) {
    this.itemsPerPage = $event.pageSize;
    this.page = $event.pageIndex;
    this.loadPage();
  }

  resetPassword(row: User) {
    const data = {
      user: row,
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
    this.dialog.open(ResetPasswordComponent, dialogConfig);
  }
}
