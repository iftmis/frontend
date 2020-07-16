import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectionProcessComponent } from './inspection-process.component';
import { MobilizationComponent } from './mobilization/mobilization.component';
import { ExecutionComponent } from './execution/execution.component';
import { ReportAndFollowupComponent } from './report-and-followup/report-and-followup.component';
import { SharedModule } from '../shared/shared.module';
import { InspectionProcessRoutingModule } from './inspection-process-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InspectionProcessComponent,
    MobilizationComponent,
    ExecutionComponent,
    ReportAndFollowupComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    InspectionProcessRoutingModule,
    FormsModule,
  ],
})
export class InspectionProcessModule {}
