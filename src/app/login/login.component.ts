import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthenticationService } from '../security/authentication.service';
import { User } from '../security/user';
import { environment } from '../../environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  loginError: boolean;
  private componentDestroyed$ = new Subject();

  constructor(
    formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar,
    private titleService: Title
  ) {
    this.loginForm = formBuilder.group({
      username: formBuilder.control('', [Validators.required]),
      password: formBuilder.control('', [Validators.required]),
    });
    this.loginError = false;
    this.titleService.setTitle('Login|' + environment.app);
  }

  get username(): AbstractControl | null {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  login() {
    this.loginError = false;
    this.authenticationService
      .login(this.username!.value, this.password!.value)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        next: (user: User) => {
          this.router.navigate(['/']);
          this.loginForm.reset();
          this.snackBar.open(
            `Welcome ${user.firstName ? user.login : user.firstName}`
          );
        },
        error: (err: any) => {
          this.loginError = true;
          this.ref.detectChanges();
        },
      });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
