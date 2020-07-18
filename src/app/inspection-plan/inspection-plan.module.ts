import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { inspectionPlanRoutes } from './inspection-plan.route';
import { InspectionPlanListComponent } from './inspection-plan-list/inspection-plan-list.component';
import { InspectionPlanDetailComponent } from './inspection-plan-detail/inspection-plan-detail.component';
import { InspectionPlanDeleteComponent } from './inspection-plan-delete/inspection-plan-delete.component';

@NgModule({
  declarations: [
    InspectionPlanListComponent,
    InspectionPlanDetailComponent,
    InspectionPlanDeleteComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(inspectionPlanRoutes)],
  exports: [],
})
export class InspectionPlanModule {}
