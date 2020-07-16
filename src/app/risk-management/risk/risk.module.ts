import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { riskRoutes } from './risk.route';
import { RiskListComponent } from './risk-list/risk-list.component';
import { RiskDetailComponent } from './risk-detail/risk-detail.component';
import { RiskDeleteComponent } from './risk-delete/risk-delete.component';
import { TreeModule } from 'angular-tree-component';

@NgModule({
  declarations: [RiskListComponent, RiskDetailComponent, RiskDeleteComponent],
  imports: [
    SharedModule,
    TreeModule.forRoot(),
    RouterModule.forChild(riskRoutes),
  ],
  exports: [],
})
export class RiskModule {}
