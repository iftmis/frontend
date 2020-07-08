import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { indicatorRoutes } from './indicator.route';
import { IndicatorListComponent } from './indicator-list/indicator-list.component';
import { IndicatorDetailComponent } from './indicator-detail/indicator-detail.component';
import { IndicatorDeleteComponent } from './indicator-delete/indicator-delete.component';

@NgModule({
  declarations: [
    IndicatorListComponent,
    IndicatorDetailComponent,
    IndicatorDeleteComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(indicatorRoutes)],
  exports: [],
})
export class IndicatorModule {}
