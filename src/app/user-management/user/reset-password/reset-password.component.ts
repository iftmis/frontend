import { Component, Inject, OnInit } from '@angular/core';
import { ResetPasswordFormService } from './reset-password-form.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PasswordReset, User } from '../user';
import { UserService } from '../user.service';
import { FormGroup } from '@angular/forms';
import { ToastService } from '../../../shared/toast.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  user: User;
  passwordReset: PasswordReset;
  isSaveOrUpdateInProgress = false;
  error: string | undefined = undefined;

  constructor(
    private formService: ResetPasswordFormService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<ResetPasswordComponent>
  ) {
    this.user = data.user;
  }

  ngOnInit(): void {
    const ps = {
      id: this.user.id,
      password: '',
      passwordConfirmation: '',
    } as PasswordReset;
    this.form = this.formService.toFormGroup(ps);
    this.error = undefined;
  }

  save() {
    this.isSaveOrUpdateInProgress = true;
    this.error = undefined;
    this.subscribeToResponse(
      this.userService.resetPassword(this.formService.fromFormGroup(this.form))
    );
  }

  private subscribeToResponse(result: Observable<User>) {
    result.subscribe({
      next: () => {
        this.toastService.success('Success!', 'Password Reset Successfully!');
        this.dialogRef.close();
      },
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

  close() {
    this.dialogRef.close();
  }
}
