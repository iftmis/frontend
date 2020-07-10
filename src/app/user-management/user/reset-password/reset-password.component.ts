import { Component, OnInit } from '@angular/core';
import { ResetPasswordFormService } from './reset-password-form.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(protected resetPasswordFormService: ResetPasswordFormService) {}

  ngOnInit(): void {}
}
