import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreparationRoutingModule } from './preparation-routing.module';
import { PreparationComponent } from './preparation.component';
import { InspectionMemberListComponent } from './inspection-member/inspection-member-list/inspection-member-list.component';
import { InspectionMemberDetailComponent } from './inspection-member/inspection-member-detail/inspection-member-detail.component';
import { InspectionMemberDeleteComponent } from './inspection-member/inspection-member-delete/inspection-member-delete.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { InspectionSubAreaListComponent } from './inspection-sub-area/inspection-sub-area-list/inspection-sub-area-list.component';
import { InspectionSubAreaDetailComponent } from './inspection-sub-area/inspection-sub-area-detail/inspection-sub-area-detail.component';
import { InspectionSubAreaDeleteComponent } from './inspection-sub-area/inspection-sub-area-delete/inspection-sub-area-delete.component';
import { ClientLetterComponent } from './client-letter/client-letter.component';
import { TeamMeetingComponent } from './team-meeting/team-meeting.component';
import { TeamMeetingTimelineListComponent } from './team-meeting-timeline/team-meeting-timeline-list/team-meeting-timeline-list.component';
import { TeamMeetingTimelineDetailComponent } from './team-meeting-timeline/team-meeting-timeline-detail/team-meeting-timeline-detail.component';
import { TeamMeetingTimelineDeleteComponent } from './team-meeting-timeline/team-meeting-timeline-delete/team-meeting-timeline-delete.component';
import { ApproveComponent } from './approve/approve.component';

// @ts-ignore
@NgModule({
  declarations: [
    PreparationComponent,
    InspectionMemberListComponent,
    InspectionMemberDetailComponent,
    InspectionMemberDeleteComponent,
    InspectionSubAreaListComponent,
    InspectionSubAreaDetailComponent,
    InspectionSubAreaDeleteComponent,
    ClientLetterComponent,
    TeamMeetingComponent,
    TeamMeetingTimelineListComponent,
    TeamMeetingTimelineDetailComponent,
    TeamMeetingTimelineDeleteComponent,
    ApproveComponent,
  ],
  imports: [CommonModule, PreparationRoutingModule, SharedModule, FormsModule],
})
export class PreparationModule {}
