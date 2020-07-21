import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindingManagementComponent } from './finding-management.component';
import { SharedModule } from '../shared/shared.module';
import { FindingManagementRoutingModule } from './finding-management-routing.module';
import { TreeModule } from 'angular-tree-component';
import { FindingModule } from './finding/finding.module';

@NgModule({
  declarations: [FindingManagementComponent],
  imports: [
    CommonModule,
    SharedModule,
    TreeModule.forRoot(),
    FindingModule,
    FindingManagementRoutingModule,
  ],
})
export class FindingManagementModule {}
