import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { riskRankRoutes } from './risk-rank.route';
import { RiskRankListComponent } from './risk-rank-list/risk-rank-list.component';
import { RiskRankDetailComponent } from './risk-rank-detail/risk-rank-detail.component';
import { RiskRankDeleteComponent } from './risk-rank-delete/risk-rank-delete.component';

@NgModule({
  declarations: [
    RiskRankListComponent,
    RiskRankDetailComponent,
    RiskRankDeleteComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(riskRankRoutes)],
  exports: [],
})
export class RiskRankModule {}
