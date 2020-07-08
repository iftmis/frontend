import { Route } from '@angular/router';

import { AuditableAreaListComponent } from './auditable-area-list/auditable-area-list.component';
import { AuditableAreaDetailComponent } from './auditable-area-detail/auditable-area-detail.component';
import { AuditableAreaResolver } from './auditable-area.resolver';

export const auditableAreaRoutes: Route[] = [
  {
    path: 'new',
    component: AuditableAreaDetailComponent,
    resolve: {
      auditableArea: AuditableAreaResolver,
    },
  },
  {
    path: ':id/edit',
    component: AuditableAreaDetailComponent,
    resolve: {
      auditableArea: AuditableAreaResolver,
    },
  },
  {
    path: '',
    component: AuditableAreaListComponent,
    runGuardsAndResolvers: 'always',
  },
];
