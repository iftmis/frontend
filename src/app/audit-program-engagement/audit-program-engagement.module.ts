import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { auditProgramEngagementRoutes } from './audit-program-engagement.route';
import { AuditProgramEngagementListComponent } from './audit-program-engagement-list/audit-program-engagement-list.component';
import { AuditProgramEngagementDetailComponent } from './audit-program-engagement-detail/audit-program-engagement-detail.component';
import { AuditProgramEngagementDeleteComponent } from './audit-program-engagement-delete/audit-program-engagement-delete.component';

@NgModule({
  declarations: [
    AuditProgramEngagementListComponent,
    AuditProgramEngagementDetailComponent,
    AuditProgramEngagementDeleteComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(auditProgramEngagementRoutes)],
  exports: [],
})
export class AuditProgramEngagementModule {}
