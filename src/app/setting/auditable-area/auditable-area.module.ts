import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { auditableAreaRoutes } from './auditable-area.route';
import { AuditableAreaListComponent } from './auditable-area-list/auditable-area-list.component';
import { AuditableAreaDetailComponent } from './auditable-area-detail/auditable-area-detail.component';
import { AuditableAreaDeleteComponent } from './auditable-area-delete/auditable-area-delete.component';

@NgModule({
  declarations: [
    AuditableAreaListComponent,
    AuditableAreaDetailComponent,
    AuditableAreaDeleteComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(auditableAreaRoutes)],
  exports: [],
})
export class AuditableAreaModule {}
