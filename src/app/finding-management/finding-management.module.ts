import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindingManagementComponent } from './finding-management.component';
import { SharedModule } from '../shared/shared.module';
import { FindingManagementRoutingModule } from './finding-management-routing.module';

@NgModule({
  declarations: [FindingManagementComponent],
  imports: [CommonModule, SharedModule, FindingManagementRoutingModule],
})
export class FindingManagementModule {}
