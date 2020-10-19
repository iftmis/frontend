import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { ExecutionComponent } from './execution.component';
import { FormsModule } from '@angular/forms';
import { CourtesyComponent } from './courtesy/courtesy.component';
import { BriefingComponent } from './briefing/briefing.component';
import { CourtesyDetailComponent } from './courtesy/courtesy-detail/courtesy-detail.component';
import { CourtesyDeleteComponent } from './courtesy/courtesy-delete/courtesy-delete.component';
import { BriefingDeleteComponent } from './briefing/briefing-delete/briefing-delete.component';
import { CourtesyUploadComponent } from './courtesy/courtesy-upload/courtesy-upload.component';
import { CourtesyMembersComponent } from './courtesy/courtesy-members/courtesy-members.component';
import { BriefingUploadComponent } from './briefing/briefing-upload/briefing-upload.component';
import { BriefingMembersComponent } from './briefing/briefing-members/briefing-members.component';
import { BriefingDetailComponent } from './briefing/briefying-detail/briefing-detail.component';

@NgModule({
  declarations: [
    ExecutionComponent,
    CourtesyComponent,
    BriefingComponent,
    CourtesyDetailComponent,
    BriefingMembersComponent,
    BriefingDetailComponent,
    BriefingUploadComponent,
    CourtesyDeleteComponent,
    BriefingDeleteComponent,
    CourtesyUploadComponent,
    CourtesyMembersComponent,
  ],
  imports: [CommonModule, SharedModule, FormsModule],
})
export class ExecutionModule {}
