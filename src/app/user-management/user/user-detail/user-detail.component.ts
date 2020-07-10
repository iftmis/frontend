import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../user.service';
import { UserFormService } from './user-form.service';
import { User } from '../user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent implements OnInit {
  user: User;
  form: FormGroup;
  authorities: string[] = [];
  isSaveOrUpdateInProgress = false;
  langKeyOptions: KeyValue<string, string>[] = [
    { key: 'en', value: 'English' },
    { key: 'sw', value: 'Kiswahili' },
  ];
  error: string | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: UserFormService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ user }) => {
      this.user = user;
      this.form = this.formService.toFormGroup(user);
    });
    this.loadRoles();
    this.error = undefined;
  }

  loadRoles() {
    this.userService.authorities().subscribe(authorities => {
      this.authorities = authorities;
    });
  }

  saveOrUpdate() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    if (this.form.value.id) {
      this.subscribeToResponse(
        this.userService.update(this.formService.fromFormGroup(this.form))
      );
    } else {
      this.subscribeToResponse(
        this.userService.create(this.formService.fromFormGroup(this.form))
      );
    }
  }

  private subscribeToResponse(result: Observable<User>) {
    result.subscribe({
      next: () => this.router.navigate(['/user-management/users']),
      error: response => {
        this.isSaveOrUpdateInProgress = false;
        this.error = response.error
          ? response.error.detail ||
            response.error.title ||
            'Internal Server Error'
          : 'Internal Server Error';
      },
      complete: () => (this.isSaveOrUpdateInProgress = false),
    });
  }

  cancel() {
    this.router.navigate(['/user-management/users']);
    return false;
  }
}
