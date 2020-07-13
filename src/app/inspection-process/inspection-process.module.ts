import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectionProcessComponent } from './inspection-process.component';
import { PreparationComponent } from './preparation/preparation.component';
import { MobilizationComponent } from './mobilization/mobilization.component';
import { ExecutionComponent } from './execution/execution.component';
import { ReportAndFollowupComponent } from './report-and-followup/report-and-followup.component';
import { SharedModule } from '../shared/shared.module';
import { InspectionProcessRoutingModule } from './inspection-process-routing.module';

@NgModule({
  declarations: [
    InspectionProcessComponent,
    PreparationComponent,
    MobilizationComponent,
    ExecutionComponent,
    ReportAndFollowupComponent,
  ],
  imports: [CommonModule, SharedModule, InspectionProcessRoutingModule],
})
export class InspectionProcessModule {}
