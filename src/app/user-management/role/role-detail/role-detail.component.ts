import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { RoleService } from '../role.service';
import { RoleFormService } from './role-form.service';
import { Role } from '../role';
import { ToastService } from '../../../shared/toast.service';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleDetailComponent implements OnInit {
  role: Role;
  form: FormGroup;
  public showProgress: boolean;
  error: string | undefined = undefined;

  public title: string;
  public action: string;
  public label: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: RoleFormService,
    private roleService: RoleService,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<RoleDetailComponent>
  ) {
    this.title = data.title;
    this.action = data.action;
    this.label = data.label;
  }

  ngOnInit() {
    this.route.data.subscribe(({ role }) => {
      this.role = role;
      this.form = this.formService.toFormGroup(role);
    });

    this.error = undefined;
  }

  saveOrUpdate() {
    this.showProgress = true;
    this.error = undefined;
    if (this.form.value.name) {
      this.subscribeToResponse(
        this.roleService.update(this.formService.fromFormGroup(this.form)),
        'update'
      );
    } else {
      this.subscribeToResponse(
        this.roleService.create(this.formService.fromFormGroup(this.form)),
        'create'
      );
    }
  }

  private subscribeToResponse(result: Observable<Role>, action: string) {
    result.subscribe({
      next: () => {
        this.toastService.success('Success!', 'Role Saved Successfully');
        this._dialogRef.close({ success: true });
      },
      error: response => {
        this.showProgress = false;
        this.error = response.error
          ? response.error.detail ||
            response.error.title ||
            'Internal Server Error'
          : 'Internal Server Error';
      },
      complete: () => (this.showProgress = false),
    });
  }

  cancel() {
    this.router.navigate(['/user-management/roles']);
    return false;
  }
}
