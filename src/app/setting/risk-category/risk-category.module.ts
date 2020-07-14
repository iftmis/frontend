import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { riskCategoryRoutes } from './risk-category.route';
import { RiskCategoryListComponent } from './risk-category-list/risk-category-list.component';
import { RiskCategoryDetailComponent } from './risk-category-detail/risk-category-detail.component';
import { RiskCategoryDeleteComponent } from './risk-category-delete/risk-category-delete.component';

@NgModule({
  declarations: [
    RiskCategoryListComponent,
    RiskCategoryDetailComponent,
    RiskCategoryDeleteComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(riskCategoryRoutes)],
  exports: [],
})
export class RiskCategoryModule {}
