import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindingManagementRoutingModule } from './finding-management-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TreeModule } from 'angular-tree-component';
import { FindingModule } from './finding/finding.module';
import { RecommendationModule } from './recommendation/recommendation.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FindingManagementRoutingModule,
    SharedModule,
    FindingModule,
    RecommendationModule,
    TreeModule,
  ],
})
export class FindingManagementModule {}
