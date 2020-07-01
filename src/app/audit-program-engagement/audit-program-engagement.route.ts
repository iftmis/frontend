import { Route } from '@angular/router';

import { AuditProgramEngagementListComponent } from './audit-program-engagement-list/audit-program-engagement-list.component';
import { AuditProgramEngagementDetailComponent } from './audit-program-engagement-detail/audit-program-engagement-detail.component';
import { AuditProgramEngagementResolver } from './audit-program-engagement.resolver';
import { AuditProgramEngagementListResolver } from './audit-program-engagement-list.resolver';

export const auditProgramEngagementRoutes: Route[] = [
  {
    path: 'new',
    component: AuditProgramEngagementDetailComponent,
    resolve: {
      auditProgramEngagement: AuditProgramEngagementResolver,
    },
  },
  {
    path: ':id/edit',
    component: AuditProgramEngagementDetailComponent,
    resolve: {
      auditProgramEngagement: AuditProgramEngagementResolver,
    },
  },
  {
    path: '',
    component: AuditProgramEngagementListComponent,
    resolve: {
      auditProgramEngagements: AuditProgramEngagementListResolver,
    },
    runGuardsAndResolvers: 'always',
  },
];
