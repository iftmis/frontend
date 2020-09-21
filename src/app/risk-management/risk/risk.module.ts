import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { riskRoutes } from './risk.route';
import { RiskListComponent } from './risk-list/risk-list.component';
import { RiskDetailComponent } from './risk-detail/risk-detail.component';
import { RiskDeleteComponent } from './risk-delete/risk-delete.component';

@NgModule({
  declarations: [RiskListComponent, RiskDetailComponent, RiskDeleteComponent],
  imports: [SharedModule, RouterModule.forChild(riskRoutes)],
  exports: [],
})
export class RiskModule {}
