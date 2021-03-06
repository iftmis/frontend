import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectionProcessComponent } from './inspection-process.component';
import { ExecutionComponent } from './execution/execution.component';
import { ReportAndFollowupComponent } from './report-and-followup/report-and-followup.component';
import { SharedModule } from '../shared/shared.module';
import { InspectionProcessRoutingModule } from './inspection-process-routing.module';
import { FormsModule } from '@angular/forms';
import { ExecutionModule } from './execution/execution.module';

@NgModule({
  declarations: [InspectionProcessComponent, ReportAndFollowupComponent],
  imports: [
    CommonModule,
    SharedModule,
    InspectionProcessRoutingModule,
    FormsModule,
    ExecutionModule,
  ],
})
export class InspectionProcessModule {}
