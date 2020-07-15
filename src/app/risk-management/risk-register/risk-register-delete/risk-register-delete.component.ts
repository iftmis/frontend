import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RiskRegister } from '../risk-register';

@Component({
  selector: 'app-risk-register-delete',
  templateUrl: './risk-register-delete.component.html',
  styleUrls: ['./risk-register-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskRegisterDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: RiskRegister) {}
}
