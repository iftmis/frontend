import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectionProcessComponent } from './inspection-process.component';
import { PreparationComponent } from './preparation/preparation.component';
import { MobilizationComponent } from './mobilization/mobilization.component';
import { ExecutionComponent } from './execution/execution.component';
import { ReportAndFollowupComponent } from './report-and-followup/report-and-followup.component';
import { SharedModule } from '../shared/shared.module';
import { InspectionProcessRoutingModule } from './inspection-process-routing.module';
import { InspectionMemberListComponent } from './preparation/inspection-member/inspection-member-list/inspection-member-list.component';
import { InspectionMemberDetailComponent } from './preparation/inspection-member/inspection-member-detail/inspection-member-detail.component';
import { InspectionMemberDeleteComponent } from './preparation/inspection-member/inspection-member-delete/inspection-member-delete.component';

@NgModule({
  declarations: [
    InspectionProcessComponent,
    PreparationComponent,
    MobilizationComponent,
    ExecutionComponent,
    ReportAndFollowupComponent,
    InspectionMemberListComponent,
    InspectionMemberDetailComponent,
    InspectionMemberDeleteComponent,
  ],
  imports: [CommonModule, SharedModule, InspectionProcessRoutingModule],
})
export class InspectionProcessModule {}
