import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RiskRegister } from '../risk-register';

@Component({
  selector: 'app-risk-register-approve',
  templateUrl: './risk-register-approve.component.html',
  styleUrls: ['./risk-register-approve.component.scss'],
})
export class RiskRegisterApproveComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: RiskRegister) {}
}
