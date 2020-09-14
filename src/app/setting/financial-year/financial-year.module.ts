import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { financialYearRoutes } from './financial-year.route';
import { FinancialYearListComponent } from './financial-year-list/financial-year-list.component';
import { FinancialYearDetailComponent } from './financial-year-detail/financial-year-detail.component';
import { FinancialYearDeleteComponent } from './financial-year-delete/financial-year-delete.component';
import { ActivateComponent } from './activate/activate.component';

@NgModule({
  declarations: [
    FinancialYearListComponent,
    FinancialYearDetailComponent,
    FinancialYearDeleteComponent,
    ActivateComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(financialYearRoutes)],
  exports: [],
})
export class FinancialYearModule {}
