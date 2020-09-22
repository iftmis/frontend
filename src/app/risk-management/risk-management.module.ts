import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RiskManagementRoutingModule } from './risk-management-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, RiskManagementRoutingModule],
})
export class RiskManagementModule {}
