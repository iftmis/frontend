import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiskManagementComponent } from './risk-management.component';
import { SharedModule } from '../shared/shared.module';
import { RiskManagementRoutingModule } from './risk-management-routing.module';

@NgModule({
  declarations: [RiskManagementComponent],
  imports: [CommonModule, SharedModule, RiskManagementRoutingModule],
})
export class RiskManagementModule {}
