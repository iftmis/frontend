import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { riskRegisterRoutes } from './risk-register.route';
import { RiskRegisterListComponent } from './risk-register-list/risk-register-list.component';
import { RiskRegisterDetailComponent } from './risk-register-detail/risk-register-detail.component';
import { RiskRegisterDeleteComponent } from './risk-register-delete/risk-register-delete.component';
import { TreeModule } from 'angular-tree-component';
import { RiskRegisterApproveComponent } from './risk-register-approve/risk-register-approve.component';

@NgModule({
  declarations: [
    RiskRegisterListComponent,
    RiskRegisterDetailComponent,
    RiskRegisterDeleteComponent,
    RiskRegisterApproveComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(riskRegisterRoutes),
    TreeModule.forRoot(),
  ],
  exports: [],
})
export class RiskRegisterModule {}
