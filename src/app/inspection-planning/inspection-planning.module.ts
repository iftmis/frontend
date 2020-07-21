import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspectionPlanningRoutingModule } from './inspection-planning-routing.module';
import { InspectionPlanningComponent } from './inspection-planning.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [InspectionPlanningComponent],
  imports: [CommonModule, SharedModule, InspectionPlanningRoutingModule],
})
export class InspectionPlanningModule {}
